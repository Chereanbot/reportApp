import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ReportType, SpecificReportType } from "@prisma/client";

// Prevent static generation for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const REPORT_TYPES = {
  THEFT: ["theft", "robbery", "stealing", "burglary"],
  FIRE_OUTBREAK: ["fire", "burning", "smoke", "flames"],
  MEDICAL_EMERGENCY: ["medical", "injury", "accident", "health", "ambulance"],
  NATURAL_DISASTER: ["flood", "earthquake", "storm", "disaster", "hurricane"],
  VIOLENCE: ["violence", "assault", "fight", "attack"],
  TRAFFIC_ACCIDENT: ["traffic", "car accident", "vehicle", "crash"],
  VANDALISM: ["vandalism", "damage", "graffiti", "destruction"],
  SUSPICIOUS_ACTIVITY: ["suspicious", "strange", "unusual"],
  PUBLIC_DISTURBANCE: ["disturbance", "noise", "public", "disorder"],
  OTHER: ["other"]
};

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    if (!image || !image.includes('base64')) {
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 }
      );
    }

    const base64Data = image.split(",")[1];
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an emergency report analyzer. Analyze this image and provide a structured report.
Please respond in this exact format:
TITLE: (Write a clear, brief title for the emergency report)
TYPE: (Determine if this is an EMERGENCY or NON_EMERGENCY situation)
SPECIFIC_TYPE: (Choose one: THEFT, FIRE_OUTBREAK, MEDICAL_EMERGENCY, NATURAL_DISASTER, VIOLENCE, TRAFFIC_ACCIDENT, VANDALISM, SUSPICIOUS_ACTIVITY, PUBLIC_DISTURBANCE, or OTHER)
LOCATION_DESCRIPTION: (Describe the location or setting you see in the image)
DESCRIPTION: (Write a detailed description of what you see, potential risks, and recommended actions)

Important notes:
- For TYPE, only use EMERGENCY or NON_EMERGENCY
- For SPECIFIC_TYPE, use only one of the exact values listed above
- Be as specific as possible about the location`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      },
      prompt,
    ]);

    const text = await result.response.text();

    // Parse the response using simpler regex without 's' flag
    const titleMatch = text.match(/TITLE:\s*([\s\S]+?)(?=TYPE:|$)/);
    const typeMatch = text.match(/TYPE:\s*([\s\S]+?)(?=SPECIFIC_TYPE:|$)/);
    const specificTypeMatch = text.match(/SPECIFIC_TYPE:\s*([\s\S]+?)(?=LOCATION_DESCRIPTION:|$)/);
    const locationMatch = text.match(/LOCATION_DESCRIPTION:\s*([\s\S]+?)(?=DESCRIPTION:|$)/);
    const descMatch = text.match(/DESCRIPTION:\s*([\s\S]+)$/);

    const type = typeMatch?.[1]?.trim().toUpperCase();
    const specificType = specificTypeMatch?.[1]?.trim().toUpperCase();
    
    // Validate the type
    if (type !== "EMERGENCY" && type !== "NON_EMERGENCY") {
      throw new Error("Invalid report type from AI response");
    }

    // Validate specific type
    if (!specificType || !Object.keys(REPORT_TYPES).includes(specificType)) {
      throw new Error("Invalid specific report type from AI response");
    }

    const response = {
      title: titleMatch?.[1]?.trim() || "",
      type: type as ReportType,
      specificType: specificType as SpecificReportType,
      location: locationMatch?.[1]?.trim() || "",
      description: descMatch?.[1]?.trim() || "",
    };

    // Validate the response
    if (!response.title || !response.description || !response.location) {
      throw new Error("Incomplete AI response");
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Image analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze image. Please try again or fill in the details manually." },
      { status: 500 }
    );
  }
}
