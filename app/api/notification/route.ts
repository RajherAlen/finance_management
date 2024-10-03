import { NextResponse } from 'next/server';
import { prisma } from 'src/lib/utils/db';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const { title, description } = data;

        const existingNotification = await prisma.notification.findFirst({
            where: {
                description,
            },
        });

        if (existingNotification) {
            return NextResponse.json({ error: 'Notification already exists' }, { status: 409 });
        }

        if (existingNotification) {
            return NextResponse.json({
                message: 'Notification already exists',
                notification: existingNotification,
            });
        }

        const notifications = await prisma.notification.create({
            data,
        });

        return NextResponse.json({ notifications });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
