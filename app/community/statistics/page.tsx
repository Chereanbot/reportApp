import { BarChart, TrendingUp, TrendingDown, Users, Clock, Shield, AlertTriangle, MapPin } from "lucide-react";

interface StatCard {
  title: string;
  titleAm: string;
  value: string;
  change: number;
  trend: "up" | "down";
  description: string;
  descriptionAm: string;
}

interface CrimeCategory {
  name: string;
  nameAm: string;
  count: number;
  percentage: number;
  trend: "up" | "down";
  change: number;
}

const stats: StatCard[] = [
  {
    title: "Total Reports",
    titleAm: "ጠቅላላ ሪፖርቶች",
    value: "1,234",
    change: 12,
    trend: "down",
    description: "Reports submitted in the last 30 days",
    descriptionAm: "ባለፉት 30 ቀናት የቀረቡ ሪፖርቶች"
  },
  {
    title: "Response Time",
    titleAm: "የምላሽ ጊዜ",
    value: "15min",
    change: 8,
    trend: "up",
    description: "Average emergency response time",
    descriptionAm: "አማካይ የአደጋ ጊዜ ምላሽ ጊዜ"
  },
  {
    title: "Case Resolution",
    titleAm: "የጉዳይ መፍትሄ",
    value: "78%",
    change: 5,
    trend: "up",
    description: "Cases resolved successfully",
    descriptionAm: "በተሳካ ሁኔታ የተፈቱ ጉዳዮች"
  },
  {
    title: "Community Tips",
    titleAm: "የማህበረሰብ ምክሮች",
    value: "456",
    change: 15,
    trend: "up",
    description: "Tips received from community",
    descriptionAm: "ከማህበረሰቡ የተገኙ ምክሮች"
  }
];

const crimeCategories: CrimeCategory[] = [
  {
    name: "Theft",
    nameAm: "ስርቆት",
    count: 245,
    percentage: 35,
    trend: "down",
    change: 8
  },
  {
    name: "Vandalism",
    nameAm: "ንብረት ማውደም",
    count: 156,
    percentage: 22,
    trend: "down",
    change: 12
  },
  {
    name: "Assault",
    nameAm: "ጥቃት",
    count: 98,
    percentage: 14,
    trend: "down",
    change: 15
  },
  {
    name: "Fraud",
    nameAm: "ማጭበርበር",
    count: 78,
    percentage: 11,
    trend: "up",
    change: 3
  },
  {
    name: "Others",
    nameAm: "ሌሎች",
    count: 123,
    percentage: 18,
    trend: "down",
    change: 5
  }
];

const regions = [
  { name: "Addis Ababa", nameAm: "አዲስ አበባ", reports: 456 },
  { name: "Oromia", nameAm: "ኦሮሚያ", reports: 345 },
  { name: "Amhara", nameAm: "አማራ", reports: 234 },
  { name: "SNNPR", nameAm: "ደቡብ", reports: 189 },
  { name: "Tigray", nameAm: "ትግራይ", reports: 123 }
];

export default function StatisticsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 mb-4">
            <BarChart className="h-4 w-4" />
            <span>Crime Statistics</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Crime Statistics</h1>
          <h2 className="text-2xl font-bold text-green-400 mb-4">የወንጀል ስታቲስቲክስ</h2>
          <p className="text-zinc-400 max-w-3xl mb-2">
            Analyze crime trends and statistics in Ethiopian communities. Data is updated daily.
          </p>
          <p className="text-zinc-500 max-w-3xl">
            በኢትዮጵያ ማህበረሰቦች ውስጥ ያሉ የወንጀል አዝማሚያዎችን እና ስታቲስቲክስን ይተንትኑ። መረጃው በየቀኑ ይዘመናል።
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-zinc-900 rounded-lg border border-zinc-800"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400">
                    {index === 0 ? <Shield /> : index === 1 ? <Clock /> : index === 2 ? <AlertTriangle /> : <Users />}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-400">{stat.title}</h3>
                    <p className="text-xs text-zinc-500">{stat.titleAm}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-emerald-400" : "text-red-400"
                }`}>
                  {stat.trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  <span>{stat.change}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <p className="text-sm text-zinc-400">{stat.description}</p>
                <p className="text-sm text-zinc-500">{stat.descriptionAm}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Crime Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Categories Chart */}
          <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
            <h3 className="text-lg font-medium text-white mb-1">Crime Categories</h3>
            <h4 className="text-base font-medium text-green-400 mb-6">የወንጀል ምድቦች</h4>
            <div className="space-y-4">
              {crimeCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-sm font-medium text-zinc-400">{category.name}</div>
                      <div className="text-xs text-zinc-500">{category.nameAm}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-zinc-400">{category.count} cases</div>
                      <div className={`flex items-center gap-1 text-sm ${
                        category.trend === "up" ? "text-red-400" : "text-emerald-400"
                      }`}>
                        {category.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        <span>{category.change}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Distribution */}
          <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
            <h3 className="text-lg font-medium text-white mb-1">Regional Distribution</h3>
            <h4 className="text-base font-medium text-green-400 mb-6">የክልል ስርጭት</h4>
            <div className="space-y-6">
              {regions.map((region, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between mb-2">
                      <div>
                        <div className="text-sm font-medium text-zinc-400">{region.name}</div>
                        <div className="text-xs text-zinc-500">{region.nameAm}</div>
                      </div>
                      <div className="text-sm text-zinc-400">{region.reports} reports</div>
                    </div>
                    <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                        style={{ width: `${(region.reports / 456) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time Period Selector */}
        <div className="flex justify-center gap-4">
          <button className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 transition-colors">
            Last 30 Days / ያለፉት 30 ቀናት
          </button>
          <button className="px-4 py-2 bg-zinc-800 rounded-lg text-white hover:bg-zinc-700 transition-colors">
            Last 90 Days / ያለፉት 90 ቀናት
          </button>
          <button className="px-4 py-2 bg-zinc-800 rounded-lg text-white hover:bg-zinc-700 transition-colors">
            Last Year / ያለፈው ዓመት
          </button>
        </div>
      </div>
    </div>
  );
} 