import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { code } = await request.json();
  try {
    const updatedSnippet = await prisma.snippet.update({
      where: { id: parseInt(id) },
      data: { code },
    });
    return NextResponse.json(updatedSnippet);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update snippet' }, { status: 500 });
  }
}
