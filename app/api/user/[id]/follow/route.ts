import { auth } from "@/auth";
import prisma from "@/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Access Denied' }, { status: 401 });
        }
       
        const isFollow = await prisma.follow.findFirst({
            where: {
                followerId: id,
                followingId: session.user.id,
            },
        });

        const count = await prisma.user.findUnique({
            where: { id },
            select: { follower_count: true },
        });

        return NextResponse.json({ count:Number(count), isFollow });
    } catch (error) {
        console.error("Error in GET /follow:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest, { params: { id } }: { params: { id: string } }) {
    try {
        const session = await auth();
        if(id===session?.user?.id)              return NextResponse.json({ error: 'Access Denied' }, { status: 401 });

        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Access Denied' }, { status: 401 });
        }

        const follow = await prisma.follow.upsert({
            where: {
                followerId_followingId: {
                    followerId: id,
                    followingId: session.user.id,
                },
            },
            create: {
                followerId: id,
                followingId: session.user.id,
            },
            update: {},
        });
        if (follow) {
        const user =await prisma.user.update({
                where: { id },
                data: { follower_count: { increment: 1 } },
            });
     const count = user.follower_count || 0
            return NextResponse.json({ count:Number(count),follow });

        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    } catch (error) {
        console.error("Error in POST /follow:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params: { id } }: { params: { id: string } }) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Access Denied' }, { status: 401 });
        }

        const deleteResult = await prisma.follow.deleteMany({
            where: {
                followerId: id,
                followingId: session.user.id,
            },
        });

        if (deleteResult.count > 0) {
          const user  =  await prisma.user.update({
                where: { id },
                data: { follower_count: { decrement: 1 } },
            });
            const count = user.follower_count || 0
            return NextResponse.json({count: Number(count)});
        }

        return NextResponse.json({ success: true, followingId: id });
    } catch (error) {
        console.error("Error in DELETE /follow:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
