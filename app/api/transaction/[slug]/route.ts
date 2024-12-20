import { NextResponse } from 'next/server';
import { prisma } from 'src/lib/utils/db';

export async function POST(req: Request, props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    try {
        const data = await req.json();
        const slug = params.slug;

        const transactions = await prisma.transaction.findFirst({
            where: {
                userId: { in: [+slug] },
                description: data.description,
                date: data.date,
            },
        });

        if (transactions) {
            return NextResponse.json({ error: 'Transaction already exists' }, { status: 400 });
        }
        const newTransaction = await prisma.transaction.create({ data });

        return NextResponse.json({ newTransaction });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(req: Request, props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
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

export async function DELETE(req: Request, props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
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

export async function PATCH(req: Request, props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    try {
        const data = await req.json();
        const slug = params.slug;

        const transactionUptade = await prisma.transaction.findUnique({
            where: { id: +data.transactionId, userId: +slug },
        });

        if (!transactionUptade) {
            console.error(`Transaction with ID ${data.transactionId} not found for user ${slug}.`);
            return;
        }
        
        const updateTransaction = await prisma.transaction.update({
            where: { id: data.transactionId, userId: +slug },
            data: {
                recurring: false,
            },
        });

        return NextResponse.json({ updateTransaction });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
