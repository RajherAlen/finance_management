
import { NextResponse } from 'next/server';

import { prisma } from 'src/lib/utils/db';

export async function GET(req: Request, props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    try {
        const slug = params.slug;

        const today = new Date();
        const dayOfWeek = today.getDay();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - dayOfWeek - 7); // Set to the beginning of last week
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(today);
        endDate.setDate(startDate.getDate() + 6); // Set to the end of last week
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
