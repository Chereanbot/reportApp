"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Role } from "@prisma/client";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDemoLogin = async (role: Role) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const email = `demo.${role.toLowerCase()}@example.com`;
      const password = "demo123";

      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: role === Role.ADMIN ? "/admin/dashboard" : "/dashboard",
      });
    } catch (error) {
      console.error("Error during demo login:", error instanceof Error ? error.message : "Unknown error");
      setError("Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-neutral-800 rounded-2xl shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Sign In</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Choose a demo account to explore the app&apos;s features
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => handleDemoLogin(Role.ADMIN)}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Demo Admin Account"}
          </button>

          <button
            onClick={() => handleDemoLogin(Role.MODERATOR)}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Demo Moderator Account"}
          </button>

          <button
            onClick={() => handleDemoLogin(Role.USER)}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Demo User Account"}
          </button>
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-500 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
