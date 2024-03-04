import { Saving } from 'src/features/transactions/model/transactionModel';

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const newSaving = await prisma.savings.create({ data });

        return NextResponse.json({ newSaving });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function PATCH(req: Request) {
    try {
        const data = await req.json();

        const updatedSaving = await prisma.savings.update({
            where: {
                id: +data.id,
                userId: +data.userId,
            },
            data: {
                goalAmount: data.goalAmount,
                currentlySaved: data.currentlySaved,
                name: data.name,
                date: data.date,
            },
        });

        return NextResponse.json({ updatedSaving });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
