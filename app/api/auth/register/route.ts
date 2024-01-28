import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { email, password, fullName, username, jobRole } = await req.json();
        
        const newUser = await prisma.user.create({
            data: {
                email,
                password,
                fullName,
                username,
                jobRole,
            }
        });

        return NextResponse.json({ newUser });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
