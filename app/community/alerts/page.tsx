import { AlertTriangle, Bell, Clock, MapPin, Shield, Filter, ArrowUpRight } from "lucide-react";

interface Alert {
  id: string;
  title: string;
  titleAm: string;
  description: string;
  descriptionAm: string;
  type: "emergency" | "warning" | "info";
  location: string;
  locationAm: string;
  time: string;
  status: "active" | "resolved";
}

const alertTypes = {
  emergency: {
    icon: <AlertTriangle className="h-5 w-5" />,
    label: "Emergency",
    labelAm: "አስቸኳይ",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-400"
  },
  warning: {
    icon: <Bell className="h-5 w-5" />,
    label: "Warning",
    labelAm: "ማስጠንቀቂያ",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400"
  },
  info: {
    icon: <Shield className="h-5 w-5" />,
    label: "Information",
    labelAm: "መረጃ",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    text: "text-green-400"
  }
};

const alerts: Alert[] = [
  {
    id: "1",
    title: "Flash Flood Warning",
    titleAm: "የድንገተኛ ጎርፍ ማስጠንቀቂያ",
    description: "Heavy rainfall expected in the next 24 hours. Take necessary precautions.",
    descriptionAm: "በሚቀጥሉት 24 ሰዓታት ውስጥ ከባድ ዝናብ ይጠበቃል። አስፈላጊውን ጥንቃቄ ያድርጉ።",
    type: "emergency",
    location: "Addis Ababa, Kirkos Sub-city",
    locationAm: "አዲስ አበባ፣ ቂርቆስ ክፍለ ከተማ",
    time: "2 hours ago",
    status: "active"
  },
  {
    id: "2",
    title: "Suspicious Activity Report",
    titleAm: "የጥርጣሬ እንቅስቃሴ ሪፖርት",
    description: "Increased reports of suspicious individuals in the area. Stay vigilant.",
    descriptionAm: "በአካባቢው ጥርጣሬ የሚያጭሩ ግለሰቦች ሪፖርት ጨምሯል። ንቁ ሆነው ይጠብቁ።",
    type: "warning",
    location: "Bole Sub-city, Around Bole Medhanialem",
    locationAm: "ቦሌ ክፍለ ከተማ፣ ቦሌ መድኃኒዓለም አካባቢ",
    time: "5 hours ago",
    status: "active"
  },
  {
    id: "3",
    title: "Community Watch Update",
    titleAm: "የማህበረሰብ ክትትል ዝማኔ",
    description: "New community watch program starting next week. Volunteers needed.",
    descriptionAm: "በሚቀጥለው ሳምንት አዲስ የማህበረሰብ ክትትል ፕሮግራም ይጀምራል። በፈቃደኝነት የሚሳተፉ ሰዎች ያስፈልጋሉ።",
    type: "info",
    location: "Yeka Sub-city",
    locationAm: "የካ ክፍለ ከተማ",
    time: "1 day ago",
    status: "active"
  },
  {
    id: "4",
    title: "Road Safety Alert",
    titleAm: "የመንገድ ደህንነት ማስጠንቀቂያ",
    description: "Major road construction causing traffic delays. Use alternative routes.",
    descriptionAm: "ዋና የመንገድ ግንባታ የትራፊክ መዘግየትን እያስከተለ ነው። አማራጭ መንገዶችን ይጠቀሙ።",
    type: "warning",
    location: "Megenagna to Bole Road",
    locationAm: "መገናኛ እስከ ቦሌ መንገድ",
    time: "2 days ago",
    status: "resolved"
  }
];

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 mb-4">
            <Bell className="h-4 w-4" />
            <span>Safety Alerts</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Recent Alerts</h1>
          <h2 className="text-2xl font-bold text-green-400 mb-4">የቅርብ ጊዜ ማስጠንቀቂያዎች</h2>
          <p className="text-zinc-400 max-w-3xl mb-2">
            Stay informed about safety alerts and notifications in your area. Take necessary precautions and stay safe.
          </p>
          <p className="text-zinc-500 max-w-3xl">
            በአካባቢዎ ስላሉ የደህንነት ማስጠንቀቂያዎች እና ማሳወቂያዎች መረጃ ያግኙ። አስፈላጊውን ጥንቃቄ በማድረግ ደህንነትዎን ይጠብቁ።
          </p>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {Object.entries(alertTypes).map(([key, type]) => (
            <div
              key={key}
              className={`p-4 rounded-lg border ${type.border} ${type.bg}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  {type.icon}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className={`font-medium ${type.text}`}>{type.label}</span>
                    <span className="text-zinc-500 text-sm">/ {type.labelAm}</span>
                  </div>
                  <p className="text-2xl font-bold text-white">
                    {alerts.filter(alert => alert.type === key && alert.status === "active").length}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600 transition-colors">
            All Alerts / ሁሉም ማስጠንቀቂያዎች
          </button>
          <button className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white hover:bg-zinc-800 transition-colors inline-flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            <span className="text-zinc-400 text-sm">/ ማጣሪያ</span>
          </button>
        </div>

        {/* Alerts List */}
        <div className="space-y-6">
          {alerts.map((alert) => {
            const type = alertTypes[alert.type];
            return (
              <div
                key={alert.id}
                className={`p-6 rounded-lg border ${type.border} ${type.bg}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Alert Icon */}
                  <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center">
                    {type.icon}
                  </div>

                  {/* Alert Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${type.bg} ${type.text}`}>
                        {type.label} / {type.labelAm}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.status === "active"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-zinc-500/10 text-zinc-400"
                      }`}>
                        {alert.status === "active" ? "Active / ንቁ" : "Resolved / ተፈታ"}
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-1">
                      {alert.title}
                    </h3>
                    <h4 className="text-base font-medium text-green-400 mb-3">
                      {alert.titleAm}
                    </h4>
                    <p className="text-sm text-zinc-400 mb-1">
                      {alert.description}
                    </p>
                    <p className="text-sm text-zinc-500 mb-4">
                      {alert.descriptionAm}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <MapPin className="h-4 w-4" />
                        <div>
                          <span>{alert.location}</span>
                          <span className="text-zinc-500 text-xs ml-1">/ {alert.locationAm}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Clock className="h-4 w-4" />
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <button className="w-full sm:w-auto px-6 py-3 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2">
                      <span>View Details</span>
                      <span className="text-zinc-400 text-sm">/ ዝርዝር</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 