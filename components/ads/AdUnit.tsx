'use client';

import { useEffect } from 'react';

interface AdSenseConfig {
  [key: string]: unknown;
}

declare global {
  interface Window {
    adsbygoogle: AdSenseConfig[];
  }
}

interface AdUnitProps {
  className?: string;
  slot: string;
  responsive?: boolean;
  format?: string;
  style?: React.CSSProperties;
}

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;
const isProduction = process.env.NODE_ENV === 'production';
const isVercel = process.env.VERCEL === '1';

function loadAdSenseScript() {
  if (!ADSENSE_ID) {
    console.error('AdSense ID is not configured in environment variables');
    return;
  }

  // Check if script is already loaded
  if (document.querySelector(`script[src*="adsbygoogle"]`)) {
    return;
  }

  // Load the AdSense script
  const script = document.createElement('script');
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
  script.async = true;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}

export function AdUnit({ className, slot, responsive, format, style }: AdUnitProps) {
  useEffect(() => {
    try {
      // Only load ads in production and if AdSense ID is configured
      if (!isProduction || !ADSENSE_ID) {
        return;
      }

      loadAdSenseScript();

      // Initialize adsbygoogle if not already initialized
      if (!window.adsbygoogle) {
        window.adsbygoogle = [];
      }

      // Push the ad configuration
      window.adsbygoogle.push({});
    } catch (error) {
      console.error('Error loading ad:', error instanceof Error ? error.message : 'Unknown error');
    }
  }, []);

  // Don't render ads in development or if AdSense ID is missing
  if (!isProduction || !ADSENSE_ID) {
    return (
      <div 
        style={{ 
          background: '#f0f0f0',
          padding: '1rem',
          textAlign: 'center',
          border: '1px dashed #ccc'
        }}
      >
        Ad Placeholder ({slot})
        {!isProduction && <div>Ads only show in production</div>}
        {!ADSENSE_ID && <div>AdSense ID not configured</div>}
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className || ''}`}
      style={style || { display: 'block' }}
      data-ad-client={ADSENSE_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
      data-adtest={isVercel ? 'on' : undefined}
    />
  );
} 