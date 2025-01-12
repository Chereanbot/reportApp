"use client";
import { ReportTracker } from "@/components/report/ReportTracker";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function TrackReportContent() {
  const searchParams = useSearchParams();
  const reportId = searchParams.get('id');

  if (!reportId) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
              <p className="text-gray-600">Report ID is required. Please provide a valid report ID in the URL.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-5xl">
          <ReportTracker reportId={reportId} />
        </div>
      </div>
    </div>
  );
}

export default function TrackReportPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gray-100 py-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <TrackReportContent />
    </Suspense>
  );
}
