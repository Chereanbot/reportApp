"use client";

import { useEffect, useState } from "react";
import { ReportStatus, ReportType } from "@prisma/client";
import { Filter, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const Map = dynamic(
  () => import('../../components/Map'),
  { ssr: false }
);

interface Report {
  id: string;
  title: string;
  description: string;
  type: ReportType;
  status: ReportStatus;
  latitude: number;
  longitude: number;
  location: string;
  createdAt: string;
}

export default function MapView() {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filterStatus, setFilterStatus] = useState<ReportStatus | "ALL">("ALL");
  const [filterType, setFilterType] = useState<ReportType | "ALL">("ALL");

  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch("/api/reports");
      if (!response.ok) throw new Error("Failed to fetch reports");
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "IN_PROGRESS":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "RESOLVED":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-red-500/10 text-red-500 border-red-500/20";
    }
  };

  const filteredReports = reports.filter(report => {
    const statusMatch = filterStatus === "ALL" || report.status === filterStatus;
    const typeMatch = filterType === "ALL" || report.type === filterType;
    return statusMatch && typeMatch;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      {/* Filters */}
      <div className="absolute top-6 left-6 z-[1000] bg-neutral-900/95 backdrop-blur-sm rounded-xl border border-neutral-800 p-4 space-y-4">
        <div className="flex items-center gap-2 text-neutral-400">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
        </div>
        <div className="space-y-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as ReportStatus | "ALL")}
            className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="ALL">All Statuses</option>
            {Object.values(ReportStatus).map((status) => (
              <option key={status} value={status}>
                {status.replace("_", " ")}
              </option>
            ))}
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as ReportType | "ALL")}
            className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="ALL">All Types</option>
            {Object.values(ReportType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Map */}
      <Map 
        center={[6.4115, 38.3147]}
        reports={filteredReports}
        onSelectReport={setSelectedReport}
      />

      {/* Selected Report Info */}
      {selectedReport && (
        <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-[1000] bg-neutral-900/95 backdrop-blur-sm rounded-xl border border-neutral-800 p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-medium text-white">{selectedReport.title}</h3>
              <p className="text-sm text-neutral-400">{selectedReport.description}</p>
            </div>
            <button
              onClick={() => setSelectedReport(null)}
              className="text-neutral-400 hover:text-white"
            >
              ×
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className={`px-2 py-1 rounded-full border ${getStatusColor(selectedReport.status)}`}>
              {selectedReport.status}
            </span>
            <span className="px-2 py-1 rounded-full bg-neutral-800 text-neutral-300">
              {selectedReport.type}
            </span>
            <span className="px-2 py-1 rounded-full bg-neutral-800 text-neutral-300 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {selectedReport.location}
            </span>
          </div>
        </div>
      )}
    </div>
  );
} 