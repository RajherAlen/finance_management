import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { generateToken } from 'src/lib/utils/generateToken';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        console.error('Error fetching users:', error); // Log error
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch users from the database',
            },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect(); // Ensure Prisma disconnects after query
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const users = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (users) {
            const isValidPassword = await bcrypt.compare(data.password, users.password);
            const userToken = generateToken(data.email);

            if (isValidPassword) {
                return NextResponse.json({ userToken, userInfo: users, success: true, isLoggedIn: true, data: 'You are logged in' });
            } else {
                return NextResponse.json({ success: false, isLoggedIn: false, data: 'Password not match, please try again' });
            }
        } else {
            return NextResponse.json({ success: true, isLoggedIn: false, data: 'User not exists, you can go on next step' });
        }
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
