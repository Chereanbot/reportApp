"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Import LocationInput with no SSR
const LocationInput = dynamic(
  () => import("@/components/report/LocationInput").then((mod) => mod.LocationInput),
  { ssr: false }
);

type ReportType = "EMERGENCY" | "NON_EMERGENCY";
type SpecificReportType = 
  | "THEFT"
  | "FIRE_OUTBREAK"
  | "MEDICAL_EMERGENCY"
  | "NATURAL_DISASTER"
  | "VIOLENCE"
  | "TRAFFIC_ACCIDENT"
  | "VANDALISM"
  | "SUSPICIOUS_ACTIVITY"
  | "PUBLIC_DISTURBANCE"
  | "OTHER";

interface ReportData {
  title: string;
  description: string;
  type: ReportType;
  specificType: SpecificReportType;
  location: string;
  latitude: number | null;
  longitude: number | null;
  image: string | null;
}

const REPORT_TYPES: Record<SpecificReportType, { label: string; description: string; emergency: boolean }> = {
  THEFT: {
    label: "Theft",
    description: "Robbery, burglary, or stealing",
    emergency: true
  },
  FIRE_OUTBREAK: {
    label: "Fire Outbreak",
    description: "Fire incidents or potential fire hazards",
    emergency: true
  },
  MEDICAL_EMERGENCY: {
    label: "Medical Emergency",
    description: "Health-related emergencies requiring immediate attention",
    emergency: true
  },
  NATURAL_DISASTER: {
    label: "Natural Disaster",
    description: "Floods, earthquakes, storms, or other natural calamities",
    emergency: true
  },
  VIOLENCE: {
    label: "Violence",
    description: "Physical assault, fights, or violent behavior",
    emergency: true
  },
  TRAFFIC_ACCIDENT: {
    label: "Traffic Accident",
    description: "Vehicle collisions or traffic-related incidents",
    emergency: true
  },
  VANDALISM: {
    label: "Vandalism",
    description: "Property damage or destruction",
    emergency: false
  },
  SUSPICIOUS_ACTIVITY: {
    label: "Suspicious Activity",
    description: "Unusual or concerning behavior",
    emergency: false
  },
  PUBLIC_DISTURBANCE: {
    label: "Public Disturbance",
    description: "Noise complaints or public disorder",
    emergency: false
  },
  OTHER: {
    label: "Other",
    description: "Other incidents not covered by other categories",
    emergency: false
  }
};

interface ReportFormProps {
  onComplete: (data: ReportData) => void;
}

export function ReportForm({ onComplete }: ReportFormProps) {
  const [formData, setFormData] = useState<ReportData>({
    title: "",
    description: "",
    type: "NON_EMERGENCY" as ReportType,
    specificType: "OTHER" as SpecificReportType,
    location: "",
    latitude: null,
    longitude: null,
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset states
    setAnalysisError(null);
    setIsAnalyzing(true);

    try {
      // Convert image to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to read file'));
          }
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });

      setImage(base64);

      // Analyze image with Gemini
      const response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze image');
      }

      if (data.title && data.description && data.type && data.specificType && data.location) {
        setFormData((prev) => ({
          ...prev,
          title: data.title,
          description: data.description,
          type: data.type,
          specificType: data.specificType,
          location: data.location,
        }));
      } else {
        throw new Error('Incomplete analysis results');
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      setAnalysisError(
        error instanceof Error 
          ? error.message 
          : "Failed to analyze image. Please fill in the details manually."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const reportData = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        specificType: formData.specificType,
        location: formData.location,
        latitude: formData.latitude,
        longitude: formData.longitude,
        image: image,
      };

      const response = await fetch("/api/reports/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit report");
      }

      onComplete(result);
    } catch (error) {
      console.error("Error submitting report:", error);
      alert(error instanceof Error ? error.message : "Failed to submit report");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Emergency Type Selection */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({ ...prev, type: "EMERGENCY" }))
          }
          className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
            formData.type === "EMERGENCY"
              ? "bg-red-500/20 border-red-500 shadow-lg shadow-red-500/20"
              : "bg-zinc-900/50 border-zinc-800 hover:bg-red-500/10 hover:border-red-500/50"
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="font-medium text-red-500">Emergency</span>
            <span className="text-xs text-zinc-400">
              Immediate Response Required
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() =>
            setFormData((prev) => ({ ...prev, type: "NON_EMERGENCY" }))
          }
          className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
            formData.type === "NON_EMERGENCY"
              ? "bg-orange-500/20 border-orange-500 shadow-lg shadow-orange-500/20"
              : "bg-zinc-900/50 border-zinc-800 hover:bg-orange-500/10 hover:border-orange-500/50"
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <svg
              className="w-8 h-8 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium text-orange-500">Non-Emergency</span>
            <span className="text-xs text-zinc-400">General Report</span>
          </div>
        </button>
      </div>

      {/* Specific Report Type */}
      {formData.type && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-400">
            Report Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(REPORT_TYPES)
              .filter(([, info]) => info.emergency === (formData.type === "EMERGENCY"))
              .map(([reportType, info]) => (
                <button
                  key={reportType}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, specificType: reportType as SpecificReportType }))
                  }
                  className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                    formData.specificType === reportType
                      ? "bg-sky-500/20 border-sky-500 shadow-lg shadow-sky-500/20"
                      : "bg-zinc-900/50 border-zinc-800 hover:bg-sky-500/10 hover:border-sky-500/50"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="block font-medium text-white">{info.label}</span>
                    <span className="block text-xs text-zinc-400">{info.description}</span>
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Image Upload */}
      <div className="relative group">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="block w-full p-8 border-2 border-dashed border-zinc-700 rounded-2xl 
                   hover:border-sky-500/50 hover:bg-sky-500/5 transition-all duration-200
                   cursor-pointer text-center"
        >
          {image ? (
            <div className="space-y-4">
              <div className="w-full h-48 relative rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt="Report image preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <p className="text-sm text-zinc-400">Click to change image</p>
              {analysisError && (
                <p className="text-sm text-red-400">{analysisError}</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <svg
                className="mx-auto h-12 w-12 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div className="space-y-2">
              <p className="text-sm text-zinc-400">
                Drop an image here or click to upload
              </p>
                <p className="text-xs text-zinc-500">
                  The image will be analyzed to automatically fill in the report details
                </p>
              </div>
            </div>
          )}
        </label>
        {isAnalyzing && (
          <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <svg
                className="animate-spin h-5 w-5 text-sky-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-sm text-sky-500">Analyzing image...</span>
            </div>
          </div>
        )}
      </div>

      {/* Title Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-400">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Enter report title"
          className="w-full rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5
                   text-white transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          required
        />
      </div>

      {/* Description Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-400">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Enter detailed description"
          className="w-full h-32 rounded-xl bg-zinc-900/50 border border-zinc-800 px-4 py-3.5
                   text-white transition-colors duration-200
                   focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          required
        />
      </div>

      {/* Location Input */}
      <LocationInput
        value={formData.location}
        onChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
        onCoordinatesChange={(lat, lng) => {
          setFormData(prev => ({
            ...prev,
            latitude: lat,
            longitude: lng
          }));
        }}
      />

      <button
        type="submit"
        disabled={isSubmitting || !formData.type || !formData.specificType || !formData.title || !formData.description}
        className="w-full py-4 px-6 rounded-xl bg-sky-500 text-white font-medium
                 hover:bg-sky-600 transition-colors duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
}
