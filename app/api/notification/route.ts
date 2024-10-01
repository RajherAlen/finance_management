import { NextResponse } from 'next/server';
import { prisma } from 'src/lib/utils/db';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const notifications = await prisma.notification.create({ data });

        return NextResponse.json({ notifications });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
