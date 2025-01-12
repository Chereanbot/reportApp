import { Shield, FileText, Search, Bell, Lock, UserCheck, MessageSquare, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Choose Report Type",
    titleAm: "የሪፖርት አይነትን ይምረጡ",
    description: "Select the type of incident from our comprehensive list tailored for Ethiopian communities.",
    descriptionAm: "ለኢትዮጵያ ማህበረሰብ ከተዘጋጀው ዝርዝር ውስጥ የድርጊቱን አይነት ይምረጡ።"
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Fill Report Details",
    titleAm: "የሪፖርት ዝርዝሮችን ይሙሉ",
    description: "Provide incident details in Amharic or English, including location, time, and any relevant evidence.",
    descriptionAm: "በአማርኛ ወይም በእንግሊዘኛ የአደጋውን ዝርዝር፣ ቦታ፣ ሰዓትና ሌሎች መረጃዎችን ያካትቱ።"
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Submit Securely",
    titleAm: "በደህንነት ያስገቡ",
    description: "Your report is encrypted and submitted securely to Ethiopian law enforcement agencies.",
    descriptionAm: "ሪፖርትዎ ተመስጥሮ በደህንነት ወደ ኢትዮጵያ የህግ አስከባሪ አካላት ይላካል።"
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Receive Updates",
    titleAm: "ዝማኔዎችን ይቀበሉ",
    description: "Get updates on your report's status through our secure tracking system.",
    descriptionAm: "በደህንነት የተጠበቀ የክትትል ስርዓት በኩል የሪፖርትዎን ሁኔታ ይከታተሉ።"
  }
];

const features = [
  {
    icon: <UserCheck className="h-5 w-5" />,
    title: "Anonymous Reporting",
    titleAm: "ሚስጥራዊ ሪፖርት",
    description: "Submit reports without revealing your identity, ensuring your safety and privacy.",
    descriptionAm: "ማንነትዎን ሳያሳውቁ ሪፖርት ማድረግ ይችላሉ፣ ደህንነትዎና ግላዊነትዎ ይጠበቃል።"
  },
  {
    icon: <Search className="h-5 w-5" />,
    title: "Multi-Language Support",
    titleAm: "የቋንቋ ድጋፍ",
    description: "Submit reports in Amharic, English, or other Ethiopian languages.",
    descriptionAm: "በአማርኛ፣ በእንግሊዘኛ ወይም በሌሎች የኢትዮጵያ ቋንቋዎች ሪፖርት ማድረግ ይችላሉ።"
  },
  {
    icon: <MessageSquare className="h-5 w-5" />,
    title: "Direct Communication",
    titleAm: "ቀጥተኛ ግንኙነት",
    description: "Communicate directly with Ethiopian law enforcement while maintaining anonymity.",
    descriptionAm: "ሚስጥራዊነትዎን በጠበቀ መልኩ ከህግ አስከባሪ አካላት ጋር መገናኘት ይችላሉ።"
  },
  {
    icon: <CheckCircle className="h-5 w-5" />,
    title: "Case Resolution",
    titleAm: "የጉዳይ መፍትሄ",
    description: "Track how your report is helping make Ethiopian communities safer.",
    descriptionAm: "ሪፖርትዎ የኢትዮጵያ ማህበረሰቦችን ደህንነት እንዴት እያሻሻለ እንደሆነ ይከታተሉ።"
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 mb-4">
            <Shield className="h-4 w-4" />
            <span>Ethiopian Community Safety Platform</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">How It Works</h1>
          <h2 className="text-2xl font-bold text-green-400 mb-4">እንዴት እንደሚሰራ</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Our platform makes it easy and secure to report incidents in Ethiopian communities. Follow these simple steps to submit and monitor your reports.
          </p>
          <p className="text-zinc-400 max-w-2xl mx-auto mt-2">
            በኢትዮጵያ ማህበረሰቦች ውስጥ ያሉ ክስተቶችን በቀላሉና በደህንነት ለማሳወቅ የሚያስችል መድረክ። ሪፖርት ለማድረግና ለመከታተል እነዚህን ቀላል ደረጃዎች ይከተሉ።
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative mb-24">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-800 -translate-y-1/2 hidden lg:block" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400 mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    {step.title}
                  </h3>
                  <h4 className="text-base font-medium text-green-400 mb-2">
                    {step.titleAm}
                  </h4>
                  <p className="text-sm text-zinc-400 mb-2">
                    {step.description}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {step.descriptionAm}
                  </p>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">
                    {feature.title}
                  </h3>
                  <h4 className="text-base font-medium text-green-400 mb-2">
                    {feature.titleAm}
                  </h4>
                  <p className="text-sm text-zinc-400 mb-2">
                    {feature.description}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {feature.descriptionAm}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Ready to Submit a Report?
          </h2>
          <h3 className="text-xl font-bold text-green-400 mb-4">
            ሪፖርት ለማድረግ ዝግጁ ነዎት?
          </h3>
          <p className="text-zinc-400 mb-2 max-w-2xl mx-auto">
            Help make Ethiopian communities safer by reporting incidents. Your information helps law enforcement respond effectively.
          </p>
          <p className="text-zinc-500 mb-8 max-w-2xl mx-auto">
            ክስተቶችን በማሳወቅ የኢትዮጵያ ማህበረሰቦችን ደህንነት ለማሻሻል ይተባበሩ። መረጃዎ የህግ አስከባሪ አካላት በውጤታማነት እንዲሰሩ ይረዳል።
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/submit-report"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
            >
              Submit a Report / ሪፖርት ያድርጉ
            </a>
            <a
              href="/track-report"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors"
            >
              Track Report / ሪፖርት ይከታተሉ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
