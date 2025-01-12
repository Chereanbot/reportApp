import { InArticleAd, SidebarAd, BannerAd } from './AdPlacements';

export const HomeTopAd = () => (
  <div className="w-full max-w-7xl mx-auto px-6 py-4">
    <BannerAd />
  </div>
);

export const HomeMidAd = () => (
  <div className="w-full max-w-7xl mx-auto px-6 py-4">
    <InArticleAd />
  </div>
);

export const HomeSideAd = () => (
  <div className="hidden lg:block w-full h-full max-w-[300px]">
    <div className="sticky top-24">
      <SidebarAd />
    </div>
  </div>
); 