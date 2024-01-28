import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const users = await prisma.user.findMany();

        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        return NextResponse.json({
            success: false, error: 'Failed to test database connection',
        });
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const users = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (users) {
            // CHECK IF PASSWORD MATCH WITH THIS
            // IF MATCH - SUCCESS TRUE - NAVIGATE TO DASHBOARD
            // ELSE - SUCCESS FALSE - THROW TOAST AND TRY AGAIN
            return NextResponse.json({ success: false, data: "User exists" });
        } else {
            return NextResponse.json({ success: true, data: "User not exists, you can go on next step" });
        }
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
