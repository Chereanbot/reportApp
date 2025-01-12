import AdUnit from './AdUnit';

export const InArticleAd = () => (
  <AdUnit
    adSlot="YOUR_AD_SLOT_ID"
    adFormat="rectangle"
    style={{ minHeight: '250px', backgroundColor: '#f3f4f6' }}
  />
);

export const SidebarAd = () => (
  <AdUnit
    adSlot="YOUR_AD_SLOT_ID"
    adFormat="vertical"
    style={{ minHeight: '600px', backgroundColor: '#f3f4f6' }}
  />
);

export const BannerAd = () => (
  <AdUnit
    adSlot="YOUR_AD_SLOT_ID"
    adFormat="horizontal"
    style={{ minHeight: '90px', backgroundColor: '#f3f4f6' }}
  />
); 