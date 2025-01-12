import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Report } from "@prisma/client";

export default function ReportDetailsPage({ params }: { params: { id: string } }) {
  const { status } = useSession();
  const router = useRouter();
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const fetchReport = useCallback(async () => {
    try {
      const response = await fetch(`/api/reports/${params.id}`);
      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.error("Error fetching report:", error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Report Not Found</h1>
        <p className="text-gray-600">The requested report could not be found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Report Details</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Report ID</h3>
          <p className="mt-1">{report.reportId}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Title</h3>
          <p className="mt-1">{report.title}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Description</h3>
          <p className="mt-1">{report.description}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Type</h3>
          <p className="mt-1">{report.type}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Specific Type</h3>
          <p className="mt-1">{report.specificType}</p>
        </div>
        {report.location && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Location</h3>
            <p className="mt-1">{report.location}</p>
          </div>
        )}
        <div>
          <h3 className="text-sm font-medium text-gray-500">Status</h3>
          <p className="mt-1">{report.status}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Created At</h3>
          <p className="mt-1">{new Date(report.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
} 