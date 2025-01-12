"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Bell,
  Settings,
  BarChart2,
  Shield,
  MessageSquare,
  Map,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  submenu?: { title: string; href: string }[];
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: <FileText className="w-5 h-5" />,
    submenu: [
      { title: "All Reports", href: "/dashboard/reports" },
      { title: "Pending", href: "/dashboard/reports?status=PENDING" },
      { title: "In Progress", href: "/dashboard/reports?status=IN_PROGRESS" },
      { title: "Resolved", href: "/dashboard/reports?status=RESOLVED" },
    ],
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: <Users className="w-5 h-5" />,
    submenu: [
      { title: "All Users", href: "/dashboard/users" },
      { title: "Admins", href: "/dashboard/users?role=ADMIN" },
      { title: "Moderators", href: "/dashboard/users?role=MODERATOR" },
      { title: "Regular Users", href: "/dashboard/users?role=USER" },
    ],
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart2 className="w-5 h-5" />,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: <Bell className="w-5 h-5" />,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    title: "Map View",
    href: "/dashboard/map",
    icon: <Map className="w-5 h-5" />,
  },
  {
    title: "Security",
    href: "/dashboard/security",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSubmenu = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-neutral-900 rounded-lg border border-neutral-800 lg:hidden"
      >
        {isSidebarOpen ? (
          <X className="w-5 h-5 text-neutral-400" />
        ) : (
          <Menu className="w-5 h-5 text-neutral-400" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-neutral-900/95 backdrop-blur-sm border-r border-neutral-800 transition-all duration-300 z-40 
          ${isSidebarOpen ? "w-64" : "w-0 lg:w-64"} overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.title}>
                {item.submenu ? (
                  <div className="space-y-1">
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
                        ${isActive(item.href)
                          ? "text-white bg-blue-600"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        {item.title}
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedItems.includes(item.title) ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandedItems.includes(item.title) && (
                      <div className="pl-12 space-y-1">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.href}
                            href={subitem.href}
                            className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors
                              ${isActive(subitem.href)
                                ? "text-white bg-blue-600"
                                : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                              }`}
                          >
                            {subitem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
                      ${isActive(item.href)
                        ? "text-white bg-blue-600"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                      }`}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Sign Out Button */}
          <div className="p-4 border-t border-neutral-800">
            <button
              onClick={() => signOut()}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
} 