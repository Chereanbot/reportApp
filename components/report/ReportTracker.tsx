"use client";

import { useState, useEffect } from "react";
import { ReportStatus, ReportType } from "@prisma/client";

interface Report {
  id: string;
  title: string;
  description: string;
  type: ReportType;
  status: ReportStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface ReportTrackerProps {
  reportId: string;
}

export function ReportTracker({ reportId }: ReportTrackerProps) {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await fetch(`/api/reports/${reportId}/details`);
        if (!response.ok) {
          throw new Error(`Failed to fetch report: ${response.statusText}`);
        }
        const data = await response.json();
        setReport(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch report");
      } finally {
        setIsLoading(false);
      }
    }

    fetchReport();
  }, [reportId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 mb-2">Error loading report</div>
        <div className="text-sm text-neutral-400">{error}</div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="p-8 text-center">
        <div className="text-neutral-400">Report not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-white">{report.title}</h2>
        <p className="text-neutral-400">{report.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-neutral-800/50 rounded-xl p-4">
          <div className="text-sm font-medium text-neutral-400">Status</div>
          <div className="mt-1 text-white">{report.status}</div>
        </div>
        <div className="bg-neutral-800/50 rounded-xl p-4">
          <div className="text-sm font-medium text-neutral-400">Type</div>
          <div className="mt-1 text-white">{report.type}</div>
        </div>
      </div>

      <div className="bg-neutral-800/50 rounded-xl p-4">
        <div className="text-sm font-medium text-neutral-400 mb-2">Timeline</div>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-2 w-2 rounded-full bg-sky-500 mt-2"></div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-white">Report Created</div>
              <div className="text-xs text-neutral-400">
                {new Date(report.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="h-2 w-2 rounded-full bg-sky-500 mt-2"></div>
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-white">Last Updated</div>
              <div className="text-xs text-neutral-400">
                {new Date(report.updatedAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
