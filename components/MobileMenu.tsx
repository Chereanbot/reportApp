"use client";
import { useState } from "react";
import { X, Globe } from "lucide-react";
import Link from "next/link";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  labelAm: string;
  href: string;
  description?: string;
  descriptionAm?: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  reportItems: MenuItem[];
  communityItems: MenuItem[];
  resourceItems: MenuItem[];
}

interface MenuSectionProps {
  title: string;
  titleAm: string;
  items: MenuItem[];
}

function MenuSection({ title, titleAm, items }: MenuSectionProps) {
  return (
    <div className="py-4">
      <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
      <h4 className="text-base font-medium text-green-400 mb-4">{titleAm}</h4>
      <div className="space-y-2">
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
    </div>
  );
}

function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<'en' | 'am'>('en');

  return (
    <div className="flex items-center gap-4 py-4 px-2">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-zinc-400" />
        <span className="text-zinc-400 text-sm">Language / ቋንቋ</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
            currentLang === 'en'
              ? 'bg-green-500/10 text-green-400'
              : 'text-zinc-400 hover:bg-zinc-800'
          } transition-colors`}
          onClick={() => setCurrentLang('en')}
        >
          English
        </button>
        <button
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
            currentLang === 'am'
              ? 'bg-green-500/10 text-green-400'
              : 'text-zinc-400 hover:bg-zinc-800'
          } transition-colors`}
          onClick={() => setCurrentLang('am')}
        >
          አማርኛ
        </button>
      </div>
    </div>
  );
}

export default function MobileMenu({ isOpen, setIsOpen, reportItems, communityItems, resourceItems }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden">
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-zinc-950 shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
          <h2 className="text-lg font-medium text-white">Menu / ምናሌ</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="h-6 w-6 text-zinc-400" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(100vh-5rem)]">
          <MenuSection title="Reports" titleAm="ሪፖርቶች" items={reportItems} />
          <div className="h-px bg-zinc-800" />
          <MenuSection title="Community" titleAm="ማህበረሰብ" items={communityItems} />
          <div className="h-px bg-zinc-800" />
          <MenuSection title="Resources" titleAm="መረጃዎች" items={resourceItems} />
          <div className="h-px bg-zinc-800" />
          
          {/* Language Switcher */}
          <LanguageSwitcher />
          <div className="h-px bg-zinc-800" />

          {/* Sign In Button */}
          <div className="mt-6">
            <Link
              href="/auth/signin"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
            >
              <span>Sign In</span>
              <span className="text-green-200 text-sm">/ ይግቡ</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
