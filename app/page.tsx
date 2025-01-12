import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Eye, Bell } from "lucide-react";
import { HomeTopAd, HomeMidAd, HomeSideAd } from "@/components/ads/HomePageAds";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Top Ad */}
      <HomeTopAd />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1fr,auto] gap-12 items-start">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/10 text-sky-400">
                <Shield size={16} />
                <span className="text-sm">Secure & Anonymous Reporting</span>
              </div>

              <h1 className="text-5xl font-bold tracking-tight text-white lg:text-6xl">
                Report Crime <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                  Safely & Securely
                </span>
              </h1>

              <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
                Your voice matters in making our community safer. Report incidents anonymously 
                and help law enforcement respond effectively to keep our neighborhoods secure.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/submit-report"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-sky-500 text-white font-medium hover:bg-sky-600 transition-colors"
                >
                  Submit Report
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/track-report"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/5 text-white font-medium hover:bg-white/10 transition-colors border border-white/10"
                >
                  Track Your Report
                </Link>
              </div>
            </div>

            {/* Right Column - Image and Side Ad */}
            <div className="flex gap-8">
              <div className="relative w-[500px] h-[600px] rounded-2xl overflow-hidden bg-white/5">
                <Image
                  src="/image.png"
                  alt="Crime Reporting Illustration"
                  width={500}
                  height={600}
                  style={{ objectFit: 'cover' }}
                  priority
                  loading="eager"
                />
              </div>
              <HomeSideAd />
            </div>
          </div>

          {/* Mid Ad */}
          <HomeMidAd />

          {/* Features Section */}
          <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="h-12 w-12 rounded-lg bg-sky-500/10 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-sky-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Anonymous Reporting</h3>
              <p className="text-zinc-400">Submit reports without revealing your identity. Your privacy and safety are our top priorities.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="h-12 w-12 rounded-lg bg-sky-500/10 flex items-center justify-center mb-6">
                <Eye className="h-6 w-6 text-sky-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Track Progress</h3>
              <p className="text-zinc-400">Monitor the status of your reports in real-time. Stay informed about actions taken.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="h-12 w-12 rounded-lg bg-sky-500/10 flex items-center justify-center mb-6">
                <Bell className="h-6 w-6 text-sky-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Instant Alerts</h3>
              <p className="text-zinc-400">Receive immediate notifications about updates to your reports and important alerts.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
