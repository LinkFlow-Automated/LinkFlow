'use server';

import { prisma } from '@/lib/prisma';

export async function joinWaitlist(email: string) {
  try {
    // Check if email already exists
    const existingEntry = await prisma.waitlist.findUnique({
      where: { email }
    });

    if (existingEntry) {
      return {
        success: true,
        position: existingEntry.position,
        isExisting: true
      };
    }

    // Get the count of existing entries to determine position
    const totalEntries = await prisma.waitlist.count();
    const position = totalEntries + 1;

    // Create new waitlist entry
    const entry = await prisma.waitlist.create({
      data: {
        email,
        position
      }
    });

    return {
      success: true,
      position: entry.position,
      isExisting: false
    };
  } catch (error) {
    console.error('Error joining waitlist:', error);
    return {
      success: false,
      error: 'Failed to join waitlist'
    };
  }
}