"use client";

import { Report } from "@prisma/client";

interface ReportFormCompletedProps {
  report: Report;
  onReset: () => void;
}

export function ReportFormCompleted({ report, onReset }: ReportFormCompletedProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
          <svg
            className="w-8 h-8 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Report Submitted Successfully</h2>
        <p className="text-neutral-400">
          Your report has been received and will be reviewed by our team.
        </p>
      </div>

      <div className="bg-neutral-800/50 rounded-xl p-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-neutral-400">Report ID</h3>
          <p className="text-white">{report.reportId}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-neutral-400">Title</h3>
          <p className="text-white">{report.title}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-neutral-400">Description</h3>
          <p className="text-white">{report.description}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-neutral-400">Type</h3>
          <p className="text-white">{report.type}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-neutral-400">Specific Type</h3>
          <p className="text-white">{report.specificType}</p>
        </div>
        {report.location && (
          <div>
            <h3 className="text-sm font-medium text-neutral-400">Location</h3>
            <p className="text-white">{report.location}</p>
          </div>
        )}
        <div>
          <h3 className="text-sm font-medium text-neutral-400">Status</h3>
          <p className="text-white">{report.status}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-md"
        >
          Submit Another Report
        </button>
      </div>
    </div>
  );
}
