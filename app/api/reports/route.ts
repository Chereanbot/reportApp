import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ReportStatus, ReportType } from "@prisma/client";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") as ReportStatus | null;
    const type = searchParams.get("type") as ReportType | null;

    const where = {
      ...(status && { status }),
      ...(type && { type }),
    };

    const reports = await prisma.report.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        reportId: true,
        type: true,
        title: true,
        description: true,
        location: true,
        latitude: true,
        longitude: true,
        image: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(reports);
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return NextResponse.json(
      { error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
} 