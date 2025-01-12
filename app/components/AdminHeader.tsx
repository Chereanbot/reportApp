"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Bell, Settings, LogOut } from "lucide-react";

export default function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 bg-black border-b border-white/10 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
          
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 rounded-lg hover:bg-zinc-800 transition-colors">
              <Bell className="w-5 h-5 text-zinc-400" />
            </button>

            {/* Settings */}
            <Link 
              href="/admin/settings" 
              className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Settings className="w-5 h-5 text-zinc-400" />
            </Link>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-zinc-400">
                  {session?.user?.email}
                </p>
              </div>
              <button
                onClick={() => signOut()}
                className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 