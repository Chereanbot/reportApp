'use client';

export function AdSenseVerification() {
  const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID;

  if (!ADSENSE_ID) {
    return null;
  }

  return (
    <meta 
      name="google-adsense-account"
      content={ADSENSE_ID}
    />
  );
} 