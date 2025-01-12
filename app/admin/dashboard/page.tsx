"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Report, ReportStatus, ReportType } from "@prisma/client";
import { BarChart3, Users, AlertTriangle, CheckCircle } from "lucide-react";

interface DashboardStats {
  totalReports: number;
  pendingReports: number;
  resolvedReports: number;
  emergencyReports: number;
}

export default function AdminDashboard() {
  const { status } = useSession();
  const router = useRouter();
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0,
    emergencyReports: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const fetchReports = useCallback(async () => {
    try {
      const response = await fetch("/api/reports");
      const data = await response.json();
      setReports(data);

      // Calculate stats
      const stats = {
        totalReports: data.length,
        pendingReports: data.filter((r: Report) => r.status === ReportStatus.PENDING).length,
        resolvedReports: data.filter((r: Report) => r.status === ReportStatus.RESOLVED).length,
        emergencyReports: data.filter((r: Report) => r.type === ReportType.EMERGENCY).length,
      };
      setStats(stats);
    } catch (error) {
      console.error("Error fetching reports:", error instanceof Error ? error.message : "Unknown error");
      setStats({
        totalReports: 0,
        pendingReports: 0,
        resolvedReports: 0,
        emergencyReports: 0,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Reports"
          value={stats.totalReports}
          icon={<BarChart3 className="h-6 w-6" />}
          className="bg-blue-50"
        />
        <StatCard
          title="Pending Reports"
          value={stats.pendingReports}
          icon={<AlertTriangle className="h-6 w-6" />}
          className="bg-yellow-50"
        />
        <StatCard
          title="Resolved Reports"
          value={stats.resolvedReports}
          icon={<CheckCircle className="h-6 w-6" />}
          className="bg-green-50"
        />
        <StatCard
          title="Emergency Reports"
          value={stats.emergencyReports}
          icon={<Users className="h-6 w-6" />}
          className="bg-red-50"
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.slice(0, 5).map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.reportId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      report.type === ReportType.EMERGENCY ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      report.status === ReportStatus.PENDING ? 'bg-yellow-100 text-yellow-800' : 
                      report.status === ReportStatus.RESOLVED ? 'bg-green-100 text-green-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title,
  value,
  icon,
  className = ""
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg shadow p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-semibold mt-2">{value}</p>
        </div>
        <div className="text-gray-400">{icon}</div>
      </div>
    </div>
  );
} 