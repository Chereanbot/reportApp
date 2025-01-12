import { AdUnit } from './AdUnit';

// Website Developer Ad
export const InArticleAd = () => (
  <AdUnit
    slot="5993635694"
    format="auto"
    responsive={true}
    style={{ display: 'block' }}
  />
);

// Mobile App Ad
export const SidebarAd = () => (
  <AdUnit
    slot="9741309012"
    format="auto"
    responsive={true}
    style={{ display: 'block' }}
  />
);

// Horizontal Ad (Website Developer slot reused for banner)
export const BannerAd = () => (
  <AdUnit
    slot="5993635694"
    format="auto"
    responsive={true}
    style={{ display: 'block' }}
  />
); 