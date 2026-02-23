
import { NextResponse } from 'next/server';

import { prisma } from 'src/lib/utils/db';

export async function GET(req: Request, props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    try {
        const slug = params.slug;

        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date();
        endDate.setDate(0); // Last day of previous month
        endDate.setHours(23, 59, 59, 999);

        const transactions = await prisma.transaction.findMany({
            where: {
                userId: +slug,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
                recurring: true,
            },
        });

        return NextResponse.json({ transactions, length: transactions.length });
    } catch (error) {
        console.error('GET /transaction/last-month-recurring error:', error);
        return NextResponse.json({ error: 'Failed to fetch recurring transactions' }, { status: 500 });
    }
}
