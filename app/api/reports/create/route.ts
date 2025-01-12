import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ReportStatus, ReportType, SpecificReportType } from "@prisma/client";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// Prevent static generation for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, type, specificType, location, latitude, longitude, image } = body;

    if (!title || !description || !type || !specificType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate the type is a valid ReportType
    if (!Object.values(ReportType).includes(type)) {
      return NextResponse.json({ error: "Invalid report type" }, { status: 400 });
    }

    // Validate the specificType is a valid SpecificReportType
    if (!Object.values(SpecificReportType).includes(specificType)) {
      return NextResponse.json({ error: "Invalid specific report type" }, { status: 400 });
    }

    const reportCount = await prisma.report.count();
    const reportId = `REP${String(reportCount + 1).padStart(3, "0")}`;

    const report = await prisma.report.create({
      data: {
        reportId,
        title,
        description,
        type: type as ReportType,
        specificType: specificType as SpecificReportType,
        location,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        image,
        status: ReportStatus.PENDING,
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { error: "Failed to create report" },
      { status: 500 }
    );
  }
} 