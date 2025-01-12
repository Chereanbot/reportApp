'use client';

import { useEffect } from 'react';

interface DisplayAdProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  style?: React.CSSProperties;
}

interface WindowWithAds extends Window {
  adsbygoogle: {
    push: (params: Record<string, unknown>) => void;
  }[];
}

export default function DisplayAd({
  slot,
  format = 'auto',
  responsive = true,
  style,
}: DisplayAdProps) {
  useEffect(() => {
    try {
      const adsbygoogle = (window as WindowWithAds).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
      }
    } catch (error) {
      console.error('Error loading ad:', error instanceof Error ? error.message : 'Unknown error');
    }
  }, []);

  return (
    <div className="ad-container w-full flex justify-center my-4">
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          minHeight: '100px',
          width: '100%',
          ...style,
        }}
        data-ad-client="ca-pub-4639254636664010"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
} 