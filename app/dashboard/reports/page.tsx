"use client";

import { useEffect, useState } from "react";
import { Report, ReportStatus, ReportType } from "@prisma/client";
import { FileText, MapPin, Calendar, AlertCircle } from "lucide-react";

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "ALL">("ALL");
  const [typeFilter, setTypeFilter] = useState<ReportType | "ALL">("ALL");

  useEffect(() => {
    fetchReports();
  }, [statusFilter, typeFilter]);

  const fetchReports = async () => {
    try {
      let url = "/api/reports";
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      if (typeFilter !== "ALL") params.append("type", typeFilter);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: ReportStatus) => {
    const colors = {
      PENDING: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
      IN_PROGRESS: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
      RESOLVED: "bg-green-500/10 text-green-500 border border-green-500/20",
      DISMISSED: "bg-neutral-500/10 text-neutral-400 border border-neutral-500/20",
    };
    return colors[status];
  };

  const getTypeColor = (type: ReportType) => {
    return type === "EMERGENCY" 
      ? "bg-red-500/10 text-red-500 border border-red-500/20"
      : "bg-blue-500/10 text-blue-500 border border-blue-500/20";
  };

  // Calculate stats
  const stats = {
    totalReports: reports.length,
    emergency: reports.filter(r => r.type === "EMERGENCY").length,
    pending: reports.filter(r => r.status === "PENDING").length,
    locations: new Set(reports.map(r => r.location)).size
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Reports</h1>
        <div className="flex items-center gap-4">
          <select
            className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as ReportType | "ALL")}
          >
            <option value="ALL">All Types</option>
            <option value="EMERGENCY">Emergency</option>
            <option value="NON_EMERGENCY">Non-Emergency</option>
          </select>
          <select
            className="bg-neutral-900 border border-neutral-800 text-neutral-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/20"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ReportStatus | "ALL")}
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="DISMISSED">Dismissed</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Reports", value: stats.totalReports, icon: FileText, color: "blue" },
          { label: "Emergency", value: stats.emergency, icon: AlertCircle, color: "red" },
          { label: "Pending", value: stats.pending, icon: Calendar, color: "amber" },
          { label: "Locations", value: stats.locations, icon: MapPin, color: "green" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800"
          >
            <div className="flex items-center gap-4">
              <div className={`bg-${stat.color}-500/10 p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
              </div>
              <div>
                <p className="text-sm text-neutral-400">{stat.label}</p>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reports Table */}
      <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400">ID</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400">Title</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400">Type</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400">Location</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-neutral-400">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-neutral-800/50 transition-colors">
                  <td className="py-4 px-6 text-sm text-neutral-300">{report.reportId}</td>
                  <td className="py-4 px-6 text-sm text-neutral-300">{report.title}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                      {report.type === "EMERGENCY" ? "Emergency" : "Non-Emergency"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-neutral-300">{report.location}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-neutral-300">
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