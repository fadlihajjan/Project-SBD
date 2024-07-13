import { z } from 'zod';
import prisma from '@/prisma/client';

const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is Required.').max(255),
  description: z.string().min(1, 'Description is Required.'),
});

export async function POST(request) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success)
    return (validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return (newIssue, { status: 201 });
}
