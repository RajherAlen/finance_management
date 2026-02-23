import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from 'src/lib/utils/db';
import { generateToken } from 'src/lib/utils/generateToken';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (user) {
            const isValidPassword = await bcrypt.compare(data.password, user.password);
            const userToken = generateToken(data.email);

            if (isValidPassword) {
                // Exclude password from response
                const { password: _password, ...userInfo } = user;
                return NextResponse.json({ userToken, userInfo, success: true, isLoggedIn: true, data: 'You are logged in' });
            } else {
                return NextResponse.json({ success: false, isLoggedIn: false, data: 'Password not match, please try again' });
            }
        } else {
            return NextResponse.json({ success: true, isLoggedIn: false, data: 'User not exists, you can go on next step' });
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ success: false, error: 'An unexpected error occurred' }, { status: 500 });
    }
}
