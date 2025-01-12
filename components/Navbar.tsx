"use client";
import Link from "next/link";
import { useState } from "react";
import { 
  Shield, Bell, ChevronDown, HelpCircle, Phone, FileText,
  Users, MapPin, MessageSquare, BarChart, Globe
} from "lucide-react";
import MobileMenu from "./MobileMenu";

interface DropdownProps {
  title: string;
  titleAm: string;
  items: {
    icon: React.ReactNode;
    label: string;
    labelAm: string;
    href: string;
    description?: string;
    descriptionAm?: string;
  }[];
}

const reportItems = [
  {
    icon: <FileText className="h-4 w-4" />,
    label: "Submit Report",
    labelAm: "ሪፖርት ያድርጉ",
    href: "/submit-report",
    description: "File a new incident report",
    descriptionAm: "አዲስ የክስተት ሪፖርት ያስገቡ"
  },
  {
    icon: <Bell className="h-4 w-4" />,
    label: "Track Report",
    labelAm: "ሪፖርት ይከታተሉ",
    href: "/track-report",
    description: "Check the status of your report",
    descriptionAm: "የሪፖርትዎን ሁኔታ ይፈትሹ"
  },
  {
    icon: <MapPin className="h-4 w-4" />,
    label: "Incident Map",
    labelAm: "የክስተት ካርታ",
    href: "/incident-map",
    description: "View reported incidents in your area",
    descriptionAm: "በአካባቢዎ የተዘገቡ ክስተቶችን ይመልከቱ"
  }
];

const communityItems = [
  {
    icon: <MessageSquare className="h-4 w-4" />,
    label: "Community Forum",
    labelAm: "የማህበረሰብ መድረክ",
    href: "/community/forum",
    description: "Discuss community safety issues",
    descriptionAm: "የማህበረሰብ ደህንነት ጉዳዮችን ይወያዩ"
  },
  {
    icon: <BarChart className="h-4 w-4" />,
    label: "Statistics",
    labelAm: "ስታቲስቲክስ",
    href: "/community/statistics",
    description: "View crime statistics and trends",
    descriptionAm: "የወንጀል ስታቲስቲክስና አዝማሚያዎችን ይመልከቱ"
  },
  {
    icon: <Users className="h-4 w-4" />,
    label: "Safety Events",
    labelAm: "የደህንነት ዝግጅቶች",
    href: "/community/events",
    description: "Community safety programs and events",
    descriptionAm: "የማህበረሰብ ደህንነት ፕሮግራሞችና ዝግጅቶች"
  },
  {
    icon: <Bell className="h-4 w-4" />,
    label: "Recent Alerts",
    labelAm: "የቅርብ ጊዜ ማስጠንቀቂያዎች",
    href: "/community/alerts",
    description: "Latest safety alerts in your area",
    descriptionAm: "በአካባቢዎ የቅርብ ጊዜ የደህንነት ማስጠንቀቂያዎች"
  }
];

const resourceItems = [
  {
    icon: <HelpCircle className="h-4 w-4" />,
    label: "How it Works",
    labelAm: "እንዴት እንደሚሰራ",
    href: "/how-it-works",
    description: "Learn about our reporting system",
    descriptionAm: "ስለ ሪፖርት ስርዓታችን ይወቁ"
  },
  {
    icon: <Shield className="h-4 w-4" />,
    label: "Guidelines",
    labelAm: "መመሪያዎች",
    href: "/guidelines",
    description: "Safety reporting guidelines",
    descriptionAm: "የደህንነት ሪፖርት መመሪያዎች"
  },
  {
    icon: <Phone className="h-4 w-4" />,
    label: "Emergency Contacts",
    labelAm: "የአደጋ ጊዜ ስልክ ቁጥሮች",
    href: "/emergency",
    description: "Important emergency numbers",
    descriptionAm: "አስፈላጊ የአደጋ ጊዜ ቁጥሮች"
  }
];

function Dropdown({ title, titleAm, items }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button
        className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-zinc-100">{title}</span>
        <span className="text-zinc-400 text-sm hidden xl:inline">/ {titleAm}</span>
        <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-72 p-2 bg-zinc-900 rounded-lg border border-zinc-800 shadow-xl">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex gap-3 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center text-green-400">
                {item.icon}
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-zinc-100">{item.label}</span>
                  <span className="text-zinc-500 text-sm">/ {item.labelAm}</span>
                </div>
                {item.description && (
                  <div>
                    <p className="text-sm text-zinc-400">{item.description}</p>
                    <p className="text-sm text-zinc-500">{item.descriptionAm}</p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<'en' | 'am'>('en');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-4 w-4 text-zinc-400" />
        <span className="text-zinc-100 text-sm">
          {currentLang === 'en' ? 'EN' : 'አማ'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-32 p-1 bg-zinc-900 rounded-lg border border-zinc-800 shadow-xl">
          <button
            className={`flex items-center gap-3 w-full p-2 rounded-lg text-sm ${
              currentLang === 'en'
                ? 'bg-green-500/10 text-green-400'
                : 'text-zinc-400 hover:bg-zinc-800'
            } transition-colors`}
            onClick={() => {
              setCurrentLang('en');
              setIsOpen(false);
            }}
          >
            <span className="font-medium">English</span>
          </button>
          <button
            className={`flex items-center gap-3 w-full p-2 rounded-lg text-sm ${
              currentLang === 'am'
                ? 'bg-green-500/10 text-green-400'
                : 'text-zinc-400 hover:bg-zinc-800'
            } transition-colors`}
            onClick={() => {
              setCurrentLang('am');
              setIsOpen(false);
            }}
          >
            <span className="font-medium">አማርኛ</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-zinc-900/50 backdrop-blur-xl border-b border-zinc-800 z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white">
            <Shield className="h-6 w-6 text-green-400" />
            <span className="text-lg font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              CrimeReport
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Dropdown title="Reports" titleAm="ሪፖርቶች" items={reportItems} />
            <Dropdown title="Community" titleAm="ማህበረሰብ" items={communityItems} />
            <Dropdown title="Resources" titleAm="መረጃዎች" items={resourceItems} />
          </div>

          {/* Right Side Items */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Sign In Button */}
            <Link
              href="/auth/signin"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Sign In</span>
              <span className="text-green-200 text-sm">/ ይግቡ</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-zinc-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg
                className="h-6 w-6 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
        reportItems={reportItems}
        communityItems={communityItems}
        resourceItems={resourceItems}
      />
    </>
  );
}
