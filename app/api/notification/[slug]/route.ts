import { NextResponse } from 'next/server';
import { prisma } from 'src/lib/utils/db';

export async function GET(req: Request, props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    try {
        const slug = params.slug;

        const notifications = await prisma.notification.findMany({
            where: {
                userId: { in: [+slug] },
            },
        });

        return NextResponse.json({ notifications });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
