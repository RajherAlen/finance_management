import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try {
        const slug = params.slug;

        const transactions = await prisma.transaction.findMany({
            where: {
                userId: { in: [+slug] },
            },
        });

        return NextResponse.json({ transactions });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
    try {
        const data = await req.json();
        const slug = params.slug;

        const transactionToDelete = await prisma.transaction.findUnique({
            where: { id: data.transactionId, userId: +slug },
        });

        if (!transactionToDelete) {
            console.error(`Transaction with ID ${data.transactionId} not found for user ${slug}.`);
            return;
        }

        const deletedTransaction = await prisma.transaction.delete({
            where: { id: data.transactionId, userId: +slug },
        });

        return NextResponse.json({ deletedTransaction });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
