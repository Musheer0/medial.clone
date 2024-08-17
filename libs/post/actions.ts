"use server"

import { auth } from "@/auth"
import prisma from "@/prisma";
import { z } from "zod";
import { PostZod } from "./validation";

type CreatePostProps = z.infer<typeof PostZod>;

export const CreatePost = async (data: CreatePostProps) => {
  // Authenticate user
  const session = await auth();

  // Validate data
  try {
    PostZod.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: 'Invalid data: ' + error.errors.map(e => e.message).join(', ') };
    }
    return { error: 'Unexpected validation error' };
  }

  // Check session
  if (!session?.user?.id) {
    return { error: 'Access denied' };
  }

  try {
    // Create a new post in the database
    await prisma.post.create({
      data: {
        caption: data.caption,
        userId: session.user.id,
      },
    });
    return { success: 'Posted successfully' };
  } catch (error) {
    console.error('Database error:', error);
    return { error: 'Error posting' };
  }
};