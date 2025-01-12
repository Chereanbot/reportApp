import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

// Prevent static generation for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Mock notifications (you might want to add a Notification model to your schema)
const mockNotifications = [
  {
    id: 1,
    type: "EMERGENCY",
    title: "New Emergency Report",
    message: "A new emergency report has been submitted in Dilla City Center",
    timestamp: new Date(),
    read: false,
  },
  {
    id: 2,
    type: "UPDATE",
    title: "Report Status Updated",
    message: "Report #REP001 has been marked as resolved",
    timestamp: new Date(Date.now() - 3600000),
    read: true,
  },
  {
    id: 3,
    type: "INFO",
    title: "New User Registration",
    message: "A new user has registered to the system",
    timestamp: new Date(Date.now() - 7200000),
    read: true,
  },
];

// GET /api/notifications
export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Return mock notifications (replace with actual database query)
    return NextResponse.json(mockNotifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH /api/notifications
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, read } = body;

    // Mock update (replace with actual database update)
    const notification = mockNotifications.find(n => n.id === id);
    if (notification) {
      notification.read = read;
    }

    return NextResponse.json({ message: 'Notification updated successfully' });
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/notifications
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      // Delete single notification
      const index = mockNotifications.findIndex(n => n.id === Number(id));
      if (index !== -1) {
        mockNotifications.splice(index, 1);
      }
    } else {
      // Clear all notifications
      mockNotifications.length = 0;
    }

    return NextResponse.json({ message: 'Notifications deleted successfully' });
  } catch (error) {
    console.error('Error deleting notifications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 