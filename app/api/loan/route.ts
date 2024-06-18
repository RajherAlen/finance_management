import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const newLoan = await prisma.loan.create({ data });

        return NextResponse.json({ newLoan });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
