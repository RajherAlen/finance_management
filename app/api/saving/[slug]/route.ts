import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        const slug = params.slug;

        const savings = await prisma.savings.findMany({
            where: {
                userId: { in: [+slug] },
            },
        });

        return NextResponse.json({ savings });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
