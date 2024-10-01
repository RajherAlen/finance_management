import { NextResponse } from 'next/server';
import { prisma } from 'src/lib/utils/db';

export async function PATCH(req: Request) {
    try {
        const data: IncomeDataProps = await req.json();

        const updateIncome = await prisma.user.update({
            where: {
                id: +data.userId,
            },
            data: {
                income: data.income,
            },
        });

        return NextResponse.json({ updateIncome });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

interface IncomeDataProps {
    userId: number;
    income: number;
}
