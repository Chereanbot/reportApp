"use client";

import { useState } from 'react';
import { Menu, Bell, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { data: session } = useSession();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-black/50 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left side - Mobile menu button and logo */}
        <div className="flex items-center">
          <button
            type="button"
            className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-400"
            onClick={onMenuClick}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="lg:hidden ml-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Crime Report
            </h1>
          </div>
        </div>

        {/* Right side - User info and notifications */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="flex items-center justify-center rounded-lg p-2 text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white">
                3
              </span>
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-lg border border-neutral-800 bg-neutral-900 shadow-lg">
                <div className="flex items-center justify-between border-b border-neutral-800 p-4">
                  <h2 className="text-sm font-medium text-neutral-200">Notifications</h2>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-neutral-400 hover:text-neutral-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-2">
                  {/* Sample notifications */}
                  {[1, 2, 3].map((i) => (
                    <Link
                      key={i}
                      href="#"
                      className="block rounded-lg px-4 py-3 hover:bg-neutral-800/50"
                    >
                      <p className="text-sm text-neutral-200">New emergency report submitted</p>
                      <p className="text-xs text-neutral-400">2 minutes ago</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User info */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm font-medium text-neutral-200">{session?.user?.name || 'Admin'}</p>
              <p className="text-xs text-neutral-400">{session?.user?.email}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-neutral-800 flex items-center justify-center">
              <span className="text-sm font-medium text-neutral-200">
                {(session?.user?.name?.[0] || 'A').toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 