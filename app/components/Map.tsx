"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { ReportStatus, ReportType } from "@prisma/client";

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

interface MapProps {
  center: [number, number];
  reports: Report[];
  onSelectReport: (report: Report) => void;
}

interface IconDefault extends L.Icon.Default {
  _getIconUrl?: string;
}

export default function Map({ center, reports, onSelectReport }: MapProps) {
  useEffect(() => {
    // Fix for the default marker icon
    delete (L.Icon.Default.prototype as IconDefault)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/marker-icon-2x.png",
      iconUrl: "/marker-icon.png",
      shadowUrl: "/marker-shadow.png",
    });
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {reports.map((report) => (
        <Marker
          key={report.id}
          position={[report.latitude, report.longitude]}
          eventHandlers={{
            click: () => onSelectReport(report),
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-medium text-neutral-900">{report.title}</h3>
              <p className="text-sm text-neutral-600">{report.description}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                <span className="px-2 py-1 rounded-full bg-neutral-100 text-neutral-700">
                  {report.status}
                </span>
                <span className="px-2 py-1 rounded-full bg-neutral-100 text-neutral-700">
                  {report.type}
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 