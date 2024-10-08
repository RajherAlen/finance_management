import { NextResponse } from 'next/server';
import { prisma } from 'src/lib/utils/db';

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

export async function DELETE(req: Request) {
    try {
        const data = await req.json();

        const savingToDelete = await prisma.savings.findUnique({ where: { id: data.id, userId: data.userId } });

        if (!savingToDelete) {
            throw Error('Saving not found');
        }

        const deletedSaving = await prisma.savings.delete({ where: { id: data.id, userId: data.userId } });

        return NextResponse.json({ deletedSaving });
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
