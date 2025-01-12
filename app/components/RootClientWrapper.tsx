'use client';

import { Providers } from "../providers";
import NavigationWrapper from "./NavigationWrapper";
import Script from "next/script";

export default function RootClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers>
        <NavigationWrapper>
          <main>{children}</main>
        </NavigationWrapper>
      </Providers>
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-core.js" strategy="beforeInteractive" />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-service.js" strategy="beforeInteractive" />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-ui.js" strategy="beforeInteractive" />
      <Script src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js" strategy="beforeInteractive" />
    </>
  );
} 