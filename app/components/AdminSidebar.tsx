"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Users, FileText, Settings } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: "/admin/reports",
      label: "Reports",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
            pathname === item.href
              ? "bg-neutral-800 text-white"
              : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
          }`}
        >
          {item.icon}
          <span className="ml-3">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
} 