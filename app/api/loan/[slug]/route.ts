import { NextResponse } from 'next/server';
import { prisma } from 'src/lib/utils/db';

export async function GET(req: Request, props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    try {
        const slug = params.slug;

        const loans = await prisma.loan.findMany({
            where: {
                userId: { in: [+slug] },
            },
        });

        return NextResponse.json({ loans });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
