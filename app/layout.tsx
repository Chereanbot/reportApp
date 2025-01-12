import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers";
import Script from "next/script";

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
      </head>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
        <Script src="https://js.api.here.com/v3/3.1/mapsjs-core.js" strategy="beforeInteractive" />
        <Script src="https://js.api.here.com/v3/3.1/mapsjs-service.js" strategy="beforeInteractive" />
        <Script src="https://js.api.here.com/v3/3.1/mapsjs-ui.js" strategy="beforeInteractive" />
        <Script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
