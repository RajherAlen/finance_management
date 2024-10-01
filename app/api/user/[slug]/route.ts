
import { NextResponse } from 'next/server';

import { prisma } from 'src/lib/utils/db';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        const slug = params.slug;
        const userInfo = await prisma.user.findFirst({
            where: {
                id: { in: [+slug] },
            },
        });

        return NextResponse.json({ userInfo });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
