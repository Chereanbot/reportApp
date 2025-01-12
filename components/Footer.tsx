import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin, Shield } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  services: {
    title: "Services",
    titleAm: "አገልግሎቶች",
    links: [
      { label: "Submit Report", labelAm: "ሪፖርት ያድርጉ", href: "/report/submit" },
      { label: "Track Report", labelAm: "ሪፖርት ይከታተሉ", href: "/report/track" },
      { label: "Emergency Contacts", labelAm: "የአደጋ ጊዜ ስልኮች", href: "/resources/emergency" },
      { label: "Safety Guidelines", labelAm: "የደህንነት መመሪያዎች", href: "/resources/guidelines" }
    ]
  },
  community: {
    title: "Community",
    titleAm: "ማህበረሰብ",
    links: [
      { label: "Forum", labelAm: "መድረክ", href: "/community/forum" },
      { label: "Events", labelAm: "ዝግጅቶች", href: "/community/events" },
      { label: "Statistics", labelAm: "ስታቲስቲክስ", href: "/community/statistics" },
      { label: "Recent Alerts", labelAm: "የቅርብ ጊዜ ማስጠንቀቂያዎች", href: "/community/alerts" }
    ]
  },
  resources: {
    title: "Resources",
    titleAm: "ሀብቶች",
    links: [
      { label: "How it Works", labelAm: "እንዴት እንደሚሰራ", href: "/resources/how-it-works" },
      { label: "FAQs", labelAm: "ተደጋጋሚ ጥያቄዎች", href: "/resources/faqs" },
      { label: "Privacy Policy", labelAm: "የግላዊነት ፖሊሲ", href: "/legal/privacy" },
      { label: "Terms of Service", labelAm: "የአገልግሎት ውሎች", href: "/legal/terms" }
    ]
  }
};

const socialLinks = [
  { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
  { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
  { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  { icon: <Youtube className="h-5 w-5" />, href: "#", label: "Youtube" }
];

const contactInfo = [
  { 
    icon: <Phone className="h-5 w-5" />, 
    label: "Emergency", 
    labelAm: "አደጋ ጊዜ",
    value: "911",
    href: "tel:911"
  },
  { 
    icon: <Mail className="h-5 w-5" />, 
    label: "Email", 
    labelAm: "ኢሜይል",
    value: "support@crimereport.et",
    href: "mailto:support@crimereport.et"
  },
  { 
    icon: <MapPin className="h-5 w-5" />, 
    label: "Address", 
    labelAm: "አድራሻ",
    value: "Addis Ababa, Ethiopia",
    valueAm: "አዲስ አበባ፣ ኢትዮጵያ"
  }
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-white mb-4">
              <Shield className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-xl font-bold">CrimeReport</div>
                <div className="text-sm text-green-500">ክራይም ሪፖርት</div>
              </div>
            </div>
            <p className="text-zinc-400 mb-2">
              Empowering Ethiopian communities to report and prevent crime while maintaining anonymity and safety.
            </p>
            <p className="text-zinc-500 mb-6">
              ኢትዮጵያዊ ማህበረሰቦች ማንነታቸውን ሳይገልጹ እና ደህንነታቸውን በጠበቀ መልኩ ወንጀልን ለመዘገብ እና ለመከላከል ያስችላል።
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="p-2 bg-zinc-900 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {Object.values(footerLinks).map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-medium mb-1">{section.title}</h3>
              <h4 className="text-green-500 text-sm mb-4">{section.titleAm}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-zinc-400 hover:text-white transition-colors inline-block"
                    >
                      <span>{link.label}</span>
                      <span className="text-zinc-500 text-sm ml-1">/ {link.labelAm}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-zinc-900">
          {contactInfo.map((info, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center text-green-500">
                {info.icon}
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-zinc-400 text-sm">{info.label}</span>
                  <span className="text-zinc-500 text-xs">/ {info.labelAm}</span>
                </div>
                {info.href ? (
                  <a href={info.href} className="text-white hover:text-green-500 transition-colors">
                    {info.value}
                  </a>
                ) : (
                  <div>
                    <span className="text-white">{info.value}</span>
                    {info.valueAm && (
                      <span className="text-zinc-500 text-sm ml-1">/ {info.valueAm}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-zinc-500 text-sm text-center md:text-left">
            <span>© 2024 CrimeReport Ethiopia. All rights reserved.</span>
            <span className="block md:inline md:ml-1">ሁሉም መብቶች የተጠበቁ ናቸው።</span>
          </div>
          <div className="flex gap-6">
            <Link href="/legal/privacy" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Privacy Policy / የግላዊነት ፖሊሲ
            </Link>
            <Link href="/legal/terms" className="text-zinc-400 hover:text-white transition-colors text-sm">
              Terms of Service / የአገልግሎት ውሎች
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 