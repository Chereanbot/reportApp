"use client";

import { useState } from "react";
import { ReportForm } from "./ReportForm";
import { ReportFormCompleted } from "./ReportFormCompleted";
import { Report, ReportType, ReportStatus, SpecificReportType } from "@prisma/client";

interface ReportData {
  title: string;
  description: string;
  type: ReportType;
  specificType: SpecificReportType;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  image: string | null;
}

interface ReportWizardState {
  step: number;
  report: Report | null;
}

export function ReportWizard() {
  const [state, setState] = useState<ReportWizardState>({
    step: 1,
    report: null,
  });

  const handleReportComplete = async (data: ReportData) => {
    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          status: ReportStatus.PENDING,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create report");
      }

      const report = await response.json() as Report;
      setState({
        step: 2,
        report,
      });
    } catch (error) {
      console.error("Error creating report:", error instanceof Error ? error.message : "Unknown error");
    }
  };

  const handleReset = () => {
    setState({
      step: 1,
      report: null,
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {state.step === 1 && <ReportForm onComplete={handleReportComplete} />}
      {state.step === 2 && state.report && (
        <ReportFormCompleted report={state.report} onReset={handleReset} />
      )}
    </div>
  );
}
