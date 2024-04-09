import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        const slug = params.slug;

        const startDate = new Date();
        startDate.setDate(1); // Set to the beginning of the current month
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + 1);
        endDate.setDate(0); // Set to the last day of the current month
        endDate.setHours(23, 59, 59, 999);

        const transactions = await prisma.transaction.findMany({
            where: {
                userId: +slug,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        return NextResponse.json({ transactions });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
