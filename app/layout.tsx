import { Inter } from "next/font/google";
import "./globals.css";
import RootClientWrapper from "./components/RootClientWrapper";
import { Metadata } from "next";
import GoogleAdsense from './components/GoogleAdsense';
import { AdSenseVerification } from '@/app/components/ads/AdSenseVerification';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crime Report App",
  description: "A platform for reporting and managing crime incidents",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
        <GoogleAdsense />
        <AdSenseVerification />
      </head>
      <body className={inter.className}>
        <RootClientWrapper>
          {children}
        </RootClientWrapper>
      </body>
    </html>
  );
}
