import { AlertTriangle, Bell, Clock, MapPin, Shield, Filter, ArrowUpRight } from "lucide-react";

interface Alert {
  id: number;
  title: string;
  description: string;
  type: "emergency" | "warning" | "info";
  location: string;
  time: string;
  status: "active" | "resolved";
}

const alerts: Alert[] = [
  {
    id: 1,
    title: "Suspicious Activity Reported",
    description: "Multiple reports of suspicious individuals in unmarked vehicles around school zones. Please remain vigilant and report any unusual activity.",
    type: "warning",
    location: "School District Area",
    time: "15 minutes ago",
    status: "active"
  },
  {
    id: 2,
    title: "Emergency Road Closure",
    description: "Main Street between 5th and 7th Avenue is closed due to a traffic incident. Emergency services are on scene. Please use alternate routes.",
    type: "emergency",
    location: "Downtown Area",
    time: "45 minutes ago",
    status: "active"
  },
  {
    id: 3,
    title: "Community Watch Update",
    description: "Increased patrols in response to recent reports. Additional volunteer watch members have been deployed in affected areas.",
    type: "info",
    location: "Residential District",
    time: "2 hours ago",
    status: "active"
  },
  {
    id: 4,
    title: "Vehicle Break-in Alert",
    description: "Series of vehicle break-ins reported in overnight parking areas. Remember to lock vehicles and remove valuable items.",
    type: "warning",
    location: "North Side Parking Areas",
    time: "3 hours ago",
    status: "resolved"
  }
];

const alertTypes = {
  emergency: "bg-red-400/10 text-red-400",
  warning: "bg-amber-400/10 text-amber-400",
  info: "bg-sky-400/10 text-sky-400"
};

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Recent Alerts</h1>
          <p className="text-zinc-400 max-w-3xl">
            Stay informed about safety alerts and notifications in your area. Real-time updates about incidents and important announcements.
          </p>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
            <div className="flex items-center gap-3 text-red-400 mb-4">
              <AlertTriangle className="h-5 w-5" />
              <h3 className="font-medium">Active Emergencies</h3>
            </div>
            <div className="text-2xl font-bold text-white">2</div>
            <div className="text-sm text-zinc-400 mt-1">Requiring immediate attention</div>
          </div>
          <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
            <div className="flex items-center gap-3 text-amber-400 mb-4">
              <Bell className="h-5 w-5" />
              <h3 className="font-medium">Active Warnings</h3>
            </div>
            <div className="text-2xl font-bold text-white">5</div>
            <div className="text-sm text-zinc-400 mt-1">Monitor these situations</div>
          </div>
          <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
            <div className="flex items-center gap-3 text-sky-400 mb-4">
              <Shield className="h-5 w-5" />
              <h3 className="font-medium">Areas Monitored</h3>
            </div>
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-sm text-zinc-400 mt-1">Under active surveillance</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button className="inline-flex items-center px-4 py-2 rounded-lg bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            All Alerts
          </button>
          <button className="px-4 py-2 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors">
            Emergencies
          </button>
          <button className="px-4 py-2 rounded-lg bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 transition-colors">
            Warnings
          </button>
          <button className="px-4 py-2 rounded-lg bg-sky-400/10 text-sky-400 hover:bg-sky-400/20 transition-colors">
            Information
          </button>
        </div>

        {/* Alerts List */}
        <div className="space-y-6">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-6 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${alertTypes[alert.type]}`}>
                      {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                    </span>
                    {alert.status === "active" && (
                      <span className="flex items-center gap-1 text-sm text-green-400">
                        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                        Active
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    {alert.title}
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    {alert.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {alert.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {alert.time}
                    </div>
                  </div>
                </div>
                {alert.status === "active" && (
                  <button className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors">
                    View Details
                    <ArrowUpRight className="h-4 w-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 