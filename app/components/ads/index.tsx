import { DisplayAd } from './DisplayAd';

// Replace these slot IDs with your actual ad slot IDs from Google AdSense
export function HeaderAd() {
  return <DisplayAd slot="header-ad" format="auto" responsive />;
}

export function SidebarAd() {
  return <DisplayAd slot="sidebar-ad" format="vertical" />;
}

export function InArticleAd() {
  return <DisplayAd slot="in-article-ad" format="horizontal" />;
} 