import { NotificationProps } from 'src/features/notification/model/notificationModel';

import { NextResponse } from 'next/server';
import { prisma } from 'src/lib/utils/db';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { description } = data;

        const existingNotification = await prisma.notification.findFirst({
            where: { description },
        });

        if (existingNotification) {
            return NextResponse.json({ error: 'Notification already exists' }, { status: 409 });
        }

        const notification = await prisma.notification.create({ data });
        return NextResponse.json({ notification });
    } catch (error) {
        console.error('POST /notification error:', error);
        return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const data = await req.json();
        const { id, userId } = data as NotificationProps;

        const notification = await prisma.notification.update({
            where: { id, userId },
            data: {
                ...data,
                isRead: true,
            },
        });

        return NextResponse.json({ notification });
    } catch (error) {
        console.error('PATCH /notification error:', error);
        return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 });
    }
}
