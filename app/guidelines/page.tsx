import { Shield, Camera, MapPin, Clock, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

interface Guideline {
  icon: React.ReactNode;
  title: string;
  titleAm: string;
  description: string;
  descriptionAm: string;
}

const reportingGuidelines: Guideline[] = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Stay Safe First",
    titleAm: "መጀመሪያ ደህንነትዎን ያረጋግጡ",
    description: "If you witness a crime in progress, ensure your safety first. Move to a secure location before reporting.",
    descriptionAm: "ወንጀል ሲፈጸም ካዩ፣ መጀመሪያ ደህንነትዎን ያረጋግጡ። ሪፖርት ከማድረግዎ በፊት ወደ ደህንነት ቦታ ይሂዱ።"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Report Promptly",
    titleAm: "ወዲያውኑ ሪፖርት ያድርጉ",
    description: "Report incidents as soon as possible while details are fresh in your memory.",
    descriptionAm: "ዝርዝሮቹ በህሊናዎ ውስጥ እያሉ በተቻለ ፍጥነት ክስተቶችን ሪፖርት ያድርጉ።"
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Provide Location Details",
    titleAm: "የቦታውን ዝርዝር ይስጡ",
    description: "Be specific about the location. Include kebele, woreda, landmarks, or building numbers.",
    descriptionAm: "ስለ አካባቢው ትክክለኛ መረጃ ይስጡ። ቀበሌ፣ ወረዳ፣ ምልክቶች፣ ወይም የህንጻ ቁጥሮችን ያካትቱ።"
  },
  {
    icon: <Camera className="h-6 w-6" />,
    title: "Document Safely",
    titleAm: "በጥንቃቄ ያስረዱ",
    description: "If safe, take photos or videos of the incident, but never put yourself at risk.",
    descriptionAm: "ደህንነት ካለ፣ ፎቶዎችን ወይም ቪዲዮዎችን ይውሰዱ፣ ነገር ግን ራስዎን በአደጋ ላይ አይጥሉ።"
  }
];

const dosDonts = {
  dos: [
    {
      en: "Provide detailed descriptions of individuals involved",
      am: "ስለተሳተፉ ግለሰቦች ዝርዝር መግለጫ ይስጡ"
    },
    {
      en: "Note the date, time, and specific location",
      am: "ቀን፣ ሰዓት እና ትክክለኛ ቦታን ይመዝግቡ"
    },
    {
      en: "Include vehicle descriptions and plate numbers if relevant",
      am: "አግባብ ካለው የመኪናዎችን መግለጫና ሰሌዳ ቁጥሮችን ያካትቱ"
    },
    {
      en: "Report suspicious behavior immediately",
      am: "ጥርጣሬ የሚያጭር ባህሪን ወዲያውኑ ሪፖርት ያድርጉ"
    },
    {
      en: "Keep a personal record of your report",
      am: "የሪፖርትዎን የግል መዝገብ ይያዙ"
    },
    {
      en: "Cooperate with law enforcement when requested",
      am: "ሲጠየቁ ከህግ አስከባሪዎች ጋር ይተባበሩ"
    }
  ],
  donts: [
    {
      en: "Put yourself in danger to gather information",
      am: "መረጃ ለመሰብሰብ ራስዎን በአደጋ ላይ አይጥሉ"
    },
    {
      en: "Confront suspects or get involved directly",
      am: "ጥርጣሬ ያለባቸውን አይጋፈጡ ወይም በቀጥታ አይሳተፉ"
    },
    {
      en: "Share sensitive report details on social media",
      am: "민감한 የሪፖርት ዝርዝሮችን በማህበራዊ ሚዲያ አያጋሩ"
    },
    {
      en: "Delay reporting serious incidents",
      am: "ከባድ ክስተቶችን ሪፖርት ማድረግን አያዘግዩ"
    },
    {
      en: "Provide false or misleading information",
      am: "ሀሰተኛ ወይም አሳሳች መረጃ አይስጡ"
    },
    {
      en: "Assume someone else will report it",
      am: "ሌላ ሰው ሪፖርት ያደርጋል ብለው አይገምቱ"
    }
  ]
};

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 mb-4">
            <Shield className="h-4 w-4" />
            <span>Ethiopian Safety Guidelines</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Reporting Guidelines</h1>
          <h2 className="text-2xl font-bold text-green-400 mb-4">የሪፖርት አቀራረብ መመሪያዎች</h2>
          <p className="text-zinc-400 max-w-3xl mb-2">
            Follow these guidelines to submit effective and accurate reports. Your detailed information helps Ethiopian law enforcement respond appropriately.
          </p>
          <p className="text-zinc-500 max-w-3xl">
            ውጤታማና ትክክለኛ ሪፖርቶችን ለማቅረብ እነዚህን መመሪያዎች ይከተሉ። ዝርዝር መረጃዎ የኢትዮጵያ የህግ አስከባሪ አካላት በአግባቡ እንዲሰሩ ይረዳል።
          </p>
        </div>

        {/* Important Notice */}
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-12">
          <div className="flex items-center gap-3 text-amber-400">
            <AlertTriangle className="h-5 w-5" />
            <div>
              <p className="font-medium">For emergencies requiring immediate assistance, always call 911</p>
              <p className="text-sm">ለአስቸኳይ እርዳታ የሚያስፈልጋቸው አደጋዎች ሁልጊዜ 911 ይደውሉ</p>
            </div>
          </div>
        </div>

        {/* Reporting Guidelines */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-white mb-2">Key Guidelines</h2>
          <h3 className="text-lg font-semibold text-green-400 mb-6">ዋና መመሪያዎች</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportingGuidelines.map((guideline, index) => (
              <div
                key={index}
                className="p-6 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400">
                    {guideline.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">
                      {guideline.title}
                    </h3>
                    <h4 className="text-base font-medium text-green-400 mb-2">
                      {guideline.titleAm}
                    </h4>
                    <p className="text-sm text-zinc-400 mb-2">
                      {guideline.description}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {guideline.descriptionAm}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dos and Don'ts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Dos */}
          <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
            <div className="flex items-center gap-3 text-emerald-400 mb-2">
              <CheckCircle2 className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Do&apos;s</h2>
            </div>
            <h3 className="text-lg font-semibold text-green-400 mb-6">ማድረግ ያለብዎት</h3>
            <ul className="space-y-4">
              {dosDonts.dos.map((item, index) => (
                <li key={index} className="flex flex-col gap-1">
                  <div className="flex items-start gap-3 text-zinc-400">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-400/40 mt-1" />
                    <div>
                      <p className="text-zinc-400">{item.en}</p>
                      <p className="text-zinc-500 text-sm">{item.am}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts */}
          <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
            <div className="flex items-center gap-3 text-red-400 mb-2">
              <XCircle className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Don&apos;ts</h2>
            </div>
            <h3 className="text-lg font-semibold text-green-400 mb-6">ማድረግ የሌለብዎት</h3>
            <ul className="space-y-4">
              {dosDonts.donts.map((item, index) => (
                <li key={index} className="flex flex-col gap-1">
                  <div className="flex items-start gap-3 text-zinc-400">
                    <XCircle className="h-5 w-5 flex-shrink-0 text-red-400/40 mt-1" />
                    <div>
                      <p className="text-zinc-400">{item.en}</p>
                      <p className="text-zinc-500 text-sm">{item.am}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Report Types */}
        <div className="p-6 bg-zinc-900 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-semibold text-white mb-2">Types of Reports</h2>
          <h3 className="text-lg font-semibold text-green-400 mb-6">የሪፖርት አይነቶች</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Emergency Reports</h3>
              <h4 className="text-base font-medium text-green-400 mb-4">አስቸኳይ ሪፖርቶች</h4>
              <ul className="space-y-3">
                <li className="flex flex-col gap-1">
                  <p className="text-sm text-zinc-400">• Crimes in progress</p>
                  <p className="text-sm text-zinc-500">• እየተፈጸሙ ያሉ ወንጀሎች</p>
                </li>
                <li className="flex flex-col gap-1">
                  <p className="text-sm text-zinc-400">• Medical emergencies</p>
                  <p className="text-sm text-zinc-500">• የህክምና አደጋዎች</p>
                </li>
                <li className="flex flex-col gap-1">
                  <p className="text-sm text-zinc-400">• Fire incidents</p>
                  <p className="text-sm text-zinc-500">• የእሳት አደጋዎች</p>
                </li>
                <li className="flex flex-col gap-1">
                  <p className="text-sm text-zinc-400">• Immediate threats to safety</p>
                  <p className="text-sm text-zinc-500">• ለደህንነት ቀጥተኛ ስጋቶች</p>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Non-Emergency Reports</h3>
              <h4 className="text-base font-medium text-green-400 mb-4">አስቸኳይ ያልሆኑ ሪፖርቶች</h4>
              <ul className="space-y-3">
                <li className="flex flex-col gap-1">
                  <p className="text-sm text-zinc-400">• Suspicious activity</p>
                  <p className="text-sm text-zinc-500">• ጥርጣሬ የሚያጭር እንቅስቃሴ</p>
                </li>
                <li className="flex flex-col gap-1">
                  <p className="text-sm text-zinc-400">• Property damage</p>
                  <p className="text-sm text-zinc-500">• የንብረት ጉዳት</p>
                </li>
                <li className="flex flex-col gap-1">
                  <p className="text-sm text-zinc-400">• Noise complaints</p>
                  <p className="text-sm text-zinc-500">• የድምጽ ቅሬታዎች</p>
                </li>
                <li className="flex flex-col gap-1">
                  <p className="text-sm text-zinc-400">• Lost or stolen property</p>
                  <p className="text-sm text-zinc-500">• የጠፉ ወይም የተሰረቁ ንብረቶች</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Submit a Report?</h2>
          <h3 className="text-xl font-bold text-green-400 mb-4">ሪፖርት ለማድረግ ዝግጁ ነዎት?</h3>
          <p className="text-zinc-400 mb-2">
            Use our secure reporting system to submit detailed information about incidents in your area.
          </p>
          <p className="text-zinc-500 mb-8">
            በአካባቢዎ ስለሚከሰቱ ክስተቶች ዝርዝር መረጃ ለማቅረብ የእኛን ደህንነቱ የተጠበቀ የሪፖርት ስርዓት ይጠቀሙ።
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/submit-report"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
            >
              Submit a Report / ሪፖርት ያድርጉ
            </a>
            <a
              href="/support"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors"
            >
              Get Help / እርዳታ ያግኙ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 