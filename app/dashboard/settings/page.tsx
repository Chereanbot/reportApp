"use client";

import { useState } from "react";
import { 
  Bell, 
  Shield, 
  Globe, 
  Mail, 
  Moon,
  Sun,
  Smartphone,
  MapPin
} from "lucide-react";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6">
        {/* Notifications */}
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 overflow-hidden">
          <div className="border-b border-neutral-800 p-6">
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-500" />
              Notifications
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Manage how you receive notifications and alerts
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-neutral-400" />
                <div>
                  <p className="text-sm font-medium text-neutral-200">Email Notifications</p>
                  <p className="text-xs text-neutral-400">Receive notifications via email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-neutral-400" />
                <div>
                  <p className="text-sm font-medium text-neutral-200">Push Notifications</p>
                  <p className="text-xs text-neutral-400">Receive push notifications</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 overflow-hidden">
          <div className="border-b border-neutral-800 p-6">
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <Sun className="h-5 w-5 text-blue-500" />
              Appearance
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Customize the appearance of the dashboard
            </p>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-neutral-400" />
                <div>
                  <p className="text-sm font-medium text-neutral-200">Dark Mode</p>
                  <p className="text-xs text-neutral-400">Use dark theme</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 overflow-hidden">
          <div className="border-b border-neutral-800 p-6">
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              Security
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Manage your security preferences
            </p>
          </div>
          <div className="p-6">
            <button className="text-sm text-blue-500 hover:text-blue-400">
              Change Password
            </button>
          </div>
        </div>

        {/* Location */}
        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-800 overflow-hidden">
          <div className="border-b border-neutral-800 p-6">
            <h2 className="text-lg font-medium text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              Location
            </h2>
            <p className="mt-1 text-sm text-neutral-400">
              Configure location settings
            </p>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-neutral-400" />
              <div>
                <p className="text-sm font-medium text-neutral-200">Default Location</p>
                <p className="text-xs text-neutral-400">Dilla, Ethiopia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 