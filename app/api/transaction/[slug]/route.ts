import { NextResponse } from 'next/server';
import { prisma } from 'src/lib/utils/db';

export async function POST(req: Request, props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    try {
        const data = await req.json();
        const slug = params.slug;

        const existing = await prisma.transaction.findFirst({
            where: {
                userId: { in: [+slug] },
                description: data.description,
                date: data.date,
            },
        });

        if (existing) {
            return NextResponse.json({ error: 'Transaction already exists' }, { status: 400 });
        }

        const newTransaction = await prisma.transaction.create({ data });
        return NextResponse.json({ newTransaction });
    } catch (error) {
        console.error('POST /transaction error:', error);
        return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
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
        console.error('GET /transaction error:', error);
        return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
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
            return NextResponse.json(
                { error: `Transaction with ID ${data.transactionId} not found for user ${slug}` },
                { status: 404 }
            );
        }

        const deletedTransaction = await prisma.transaction.delete({
            where: { id: data.transactionId, userId: +slug },
        });

        return NextResponse.json({ deletedTransaction });
    } catch (error) {
        console.error('DELETE /transaction error:', error);
        return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
    }
}

export async function PATCH(req: Request, props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    try {
        const data = await req.json();
        const slug = params.slug;

        const transactionToUpdate = await prisma.transaction.findUnique({
            where: { id: +data.transactionId, userId: +slug },
        });

        if (!transactionToUpdate) {
            return NextResponse.json(
                { error: `Transaction with ID ${data.transactionId} not found for user ${slug}` },
                { status: 404 }
            );
        }

        const updatedTransaction = await prisma.transaction.update({
            where: { id: data.transactionId, userId: +slug },
            data: {
                recurring: false,
            },
        });

        return NextResponse.json({ updatedTransaction });
    } catch (error) {
        console.error('PATCH /transaction error:', error);
        return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
    }
}
