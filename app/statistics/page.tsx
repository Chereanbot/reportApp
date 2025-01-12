import { BarChart, TrendingDown, ArrowUpRight, ArrowDownRight, Map, Shield, AlertTriangle, Users } from "lucide-react";

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
}

const stats: StatCard[] = [
  {
    title: "Total Reports",
    value: "1,247",
    change: "-12%",
    trend: "down",
    description: "Total reports in the last 30 days"
  },
  {
    title: "Response Time",
    value: "18min",
    change: "-25%",
    trend: "down",
    description: "Average emergency response time"
  },
  {
    title: "Case Resolution",
    value: "76%",
    change: "+8%",
    trend: "up",
    description: "Cases resolved successfully"
  },
  {
    title: "Community Tips",
    value: "324",
    change: "+15%",
    trend: "up",
    description: "Helpful community tips received"
  }
];

const crimeCategories = [
  { category: "Theft", count: 450, percentage: 65 },
  { category: "Vandalism", count: 280, percentage: 45 },
  { category: "Suspicious Activity", count: 210, percentage: 35 },
  { category: "Traffic Incidents", count: 180, percentage: 30 },
  { category: "Noise Complaints", count: 150, percentage: 25 },
];

export default function StatisticsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Crime Statistics</h1>
          <p className="text-zinc-400 max-w-3xl">
            Analyze crime trends and statistics in your area. Data is updated daily to provide the most accurate insights.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-zinc-400">{stat.title}</h3>
                {stat.trend === "down" ? (
                  <TrendingDown className="h-4 w-4 text-green-400" />
                ) : (
                  <BarChart className="h-4 w-4 text-sky-400" />
                )}
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-zinc-500">{stat.description}</div>
                </div>
                <div className={`flex items-center ${
                  stat.trend === "up" ? "text-sky-400" : "text-green-400"
                }`}>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                  )}
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Crime Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
            <h3 className="text-lg font-medium text-white mb-6">Incident Categories</h3>
            <div className="space-y-4">
              {crimeCategories.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm text-zinc-400 mb-1">
                    <span>{item.category}</span>
                    <span>{item.count} reports</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-500 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="flex items-center gap-3 text-sky-400 mb-4">
                <Map className="h-5 w-5" />
                <h3 className="font-medium">High Alert Areas</h3>
              </div>
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-sm text-zinc-400 mt-1">Zones under surveillance</div>
            </div>
            <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="flex items-center gap-3 text-sky-400 mb-4">
                <Shield className="h-5 w-5" />
                <h3 className="font-medium">Patrol Units</h3>
              </div>
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-sm text-zinc-400 mt-1">Active in your area</div>
            </div>
            <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="flex items-center gap-3 text-sky-400 mb-4">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="font-medium">Active Alerts</h3>
              </div>
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-sm text-zinc-400 mt-1">Current warnings</div>
            </div>
            <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="flex items-center gap-3 text-sky-400 mb-4">
                <Users className="h-5 w-5" />
                <h3 className="font-medium">Watch Groups</h3>
              </div>
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-sm text-zinc-400 mt-1">Active in your area</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 