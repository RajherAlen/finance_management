
import { NextResponse } from 'next/server';

import { prisma } from 'src/lib/utils/db';

export async function GET(req: Request, props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    try {
        const slug = params.slug;

        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        startDate.setDate(1); // Set to the beginning of last month
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setDate(0); // Set to the last day of last month
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

        return NextResponse.json({ transactions, length: transactions.length });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
