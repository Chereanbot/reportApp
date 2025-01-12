'use client';

import { useEffect } from 'react';

interface AdUnitProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
}

interface WindowWithAds extends Window {
  adsbygoogle: unknown[];
}

const AdUnit = ({ adSlot, adFormat = 'auto', style }: AdUnitProps) => {
  useEffect(() => {
    try {
      // Load AdSense script if not already loaded
      const windowWithAds = window as WindowWithAds;
      if (!windowWithAds.adsbygoogle) {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }

      // Push the ad
      windowWithAds.adsbygoogle = windowWithAds.adsbygoogle || [];
      windowWithAds.adsbygoogle.push({});
    } catch (error) {
      console.error('Error loading AdSense:', error);
    }
  }, []);

  return (
    <div className="ad-container my-4">
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style,
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdUnit; 