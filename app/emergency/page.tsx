import { Phone, AlertTriangle, Siren, Hospital, Shield, UserCog, Building2, Flame } from "lucide-react";

interface EmergencyContact {
  icon: React.ReactNode;
  name: string;
  nameAm: string;
  number: string;
  description: string;
  descriptionAm: string;
  isEmergency?: boolean;
}

const emergencyContacts: EmergencyContact[] = [
  {
    icon: <Siren className="h-6 w-6" />,
    name: "Federal Police Emergency",
    nameAm: "የፌዴራል ፖሊስ ድንገተኛ አደጋ",
    number: "911",
    description: "For immediate police assistance anywhere in Ethiopia",
    descriptionAm: "በኢትዮጵያ በማንኛውም ቦታ ለአስቸኳይ የፖሊስ እርዳታ",
    isEmergency: true
  },
  {
    icon: <Flame className="h-6 w-6" />,
    name: "Fire & Emergency Service",
    nameAm: "የእሳት አደጋና ድንገተኛ አገልግሎት",
    number: "939",
    description: "Fire emergency and rescue services in major cities",
    descriptionAm: "በዋና ዋና ከተሞች የእሳት አደጋና የመታደግ አገልግሎቶች",
    isEmergency: true
  },
  {
    icon: <Hospital className="h-6 w-6" />,
    name: "Ambulance Service",
    nameAm: "የአምቡላንስ አገልግሎት",
    number: "907",
    description: "Emergency medical transport and assistance",
    descriptionAm: "የድንገተኛ ህክምና ትራንስፖርትና እርዳታ",
    isEmergency: true
  },
  {
    icon: <Shield className="h-6 w-6" />,
    name: "Traffic Police",
    nameAm: "የትራፊክ ፖሊስ",
    number: "945",
    description: "Report traffic accidents and road emergencies",
    descriptionAm: "የትራፊክ አደጋዎችንና የመንገድ ድንገተኛ አደጋዎችን ያሳውቁ"
  }
];

const communityContacts: EmergencyContact[] = [
  {
    icon: <UserCog className="h-6 w-6" />,
    name: "Community Police",
    nameAm: "የማህበረሰብ ፖሊስ",
    number: "(+251) 116-29-82-45",
    description: "Non-emergency police assistance and community safety",
    descriptionAm: "አስቸኳይ ላልሆኑ የፖሊስ እርዳታና የማህበረሰብ ደህንነት"
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    name: "Addis Ababa City Administration",
    nameAm: "የአዲስ አበባ ከተማ አስተዳደር",
    number: "(+251) 115-53-00-00",
    description: "Municipal services and city emergency response",
    descriptionAm: "የከተማ አገልግሎቶችና የከተማ ድንገተኛ አደጋ ምላሽ"
  }
];

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 mb-4">
            <Siren className="h-4 w-4" />
            <span>Ethiopian Emergency Services</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Emergency Contacts</h1>
          <h2 className="text-2xl font-bold text-green-400 mb-4">የአደጋ ጊዜ ስልክ ቁጥሮች</h2>
          <p className="text-zinc-400 max-w-3xl mb-2">
            Important emergency contact numbers in Ethiopia. Save these numbers for quick access during emergencies.
          </p>
          <p className="text-zinc-500 max-w-3xl">
            በኢትዮጵያ ውስጥ አስፈላጊ የአደጋ ጊዜ ስልክ ቁጥሮች። እነዚህን ቁጥሮች በአደጋ ጊዜ ለፈጣን አገልግሎት ያስቀምጡ።
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-12">
          <div className="flex items-center gap-3 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            <div>
              <p className="font-medium">For immediate emergencies, dial 911</p>
              <p className="text-sm">ለአስቸኳይ አደጋዎች 911 ይደውሉ</p>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-2">Emergency Services</h2>
          <h3 className="text-lg font-semibold text-green-400 mb-6">የአደጋ ጊዜ አገልግሎቶች</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border transition-colors ${
                  contact.isEmergency
                    ? "bg-red-500/10 border-red-500/20"
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <div className="flex gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                    contact.isEmergency
                      ? "bg-red-500/10 text-red-400"
                      : "bg-green-500/10 text-green-400"
                  }`}>
                    {contact.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">
                      {contact.name}
                    </h3>
                    <h4 className="text-base font-medium text-green-400 mb-2">
                      {contact.nameAm}
                    </h4>
                    <a
                      href={`tel:${contact.number}`}
                      className={`text-xl font-bold mb-2 inline-flex items-center gap-2 ${
                        contact.isEmergency ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      <Phone className="h-4 w-4" />
                      {contact.number}
                    </a>
                    <p className="text-sm text-zinc-400 mb-1">
                      {contact.description}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {contact.descriptionAm}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Contacts */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Community Resources</h2>
          <h3 className="text-lg font-semibold text-green-400 mb-6">የማህበረሰብ አገልግሎቶች</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityContacts.map((contact, index) => (
              <div
                key={index}
                className="p-6 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400">
                    {contact.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">
                      {contact.name}
                    </h3>
                    <h4 className="text-base font-medium text-green-400 mb-2">
                      {contact.nameAm}
                    </h4>
                    <a
                      href={`tel:${contact.number}`}
                      className="text-xl font-bold text-green-400 mb-2 inline-flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4" />
                      {contact.number}
                    </a>
                    <p className="text-sm text-zinc-400 mb-1">
                      {contact.description}
                    </p>
                    <p className="text-sm text-zinc-500">
                      {contact.descriptionAm}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-16 p-6 bg-zinc-900 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-semibold text-white mb-2">Additional Resources</h2>
          <h3 className="text-lg font-semibold text-green-400 mb-4">ተጨማሪ መረጃዎች</h3>
          <p className="text-zinc-400 mb-2">
            For more information about emergency preparedness and community safety:
          </p>
          <p className="text-zinc-500 mb-6">
            ስለ አደጋ ዝግጁነትና የማህበረሰብ ደህንነት ተጨማሪ መረጃ ለማግኘት:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/guidelines"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
            >
              Safety Guidelines / የደህንነት መመሪያዎች
            </a>
            <a
              href="/support"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors"
            >
              Contact Support / ድጋፍን ያግኙ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 