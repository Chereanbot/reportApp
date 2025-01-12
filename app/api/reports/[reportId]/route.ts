import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Prevent static generation for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { reportId: string } }
) {
  try {
    const report = await prisma.report.findUnique({
      where: {
        id: params.reportId,
      }
    });

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error fetching report details:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Failed to fetch report details" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { reportId: string } }
) {
  try {
    const { status } = await request.json();
    const report = await prisma.report.update({
      where: { id: params.reportId },
      data: { status },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error updating report details:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Failed to update report details" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { reportId: string } }
) {
  try {
    await prisma.report.delete({
      where: { id: params.reportId },
    });

    return NextResponse.json(
      { message: "Report deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting report:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json(
      { error: "Failed to delete report" },
      { status: 500 }
    );
  }
}
