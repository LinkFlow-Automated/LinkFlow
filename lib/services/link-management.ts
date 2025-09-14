// lib/services/link-management.ts

import { Link } from "@/lib/generated/prisma";

const API_BASE_URL = "/api/v1"
// Create a new link
export const createLink = async (linkData: Omit<Link, 'id' | 'createdAt' | 'updatedAt'>): Promise<Link> => {
  const response = await fetch(`${API_BASE_URL}/links`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(linkData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create link');
  }

  return response.json();
};

// Update a link
export const updateLink = async (linkData: Partial<Link> & { id: string }): Promise<Link> => {
  const response = await fetch(`${API_BASE_URL}/links`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(linkData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update link');
  }

  return response.json();
};

// Delete a link
export const deleteLink = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/links?id=${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete link');
  }
};

// Batch update links order
export const updateLinksOrder = async (updates: { id: string; order: number }[]): Promise<Link[]> => {
  const response = await fetch(`${API_BASE_URL}/links`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ updates }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update links order');
  }

  return response.json();
};

// Fetch all links for a user
export const fetchLinks = async (userId: string): Promise<Link[]> => {
  const response = await fetch(`${API_BASE_URL}/links?userId=${userId}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch links');
  }

  return response.json();
};