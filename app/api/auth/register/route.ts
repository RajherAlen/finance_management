import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from 'src/lib/utils/db';
import { generateToken } from 'src/lib/utils/generateToken';

export async function POST(req: Request) {
    try {
        const { email, password, fullName, username, jobRole, income } = await req.json();
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullName,
                username,
                jobRole,
                income,
            },
        });

        const userToken = generateToken(username);

        return NextResponse.json({ newUser, userToken });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
