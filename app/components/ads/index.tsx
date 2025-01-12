import DisplayAd from './DisplayAd';

// Replace these slot IDs with your actual ad slot IDs from Google AdSense
export function HeaderAd() {
  return (
    <DisplayAd
      slot="1234567890"
      format="horizontal"
      style={{ minHeight: '90px' }}
    />
  );
}

export function SidebarAd() {
  return (
    <DisplayAd
      slot="1234567891"
      format="vertical"
      style={{ minHeight: '600px' }}
    />
  );
}

export function InFeedAd() {
  return (
    <DisplayAd
      slot="1234567892"
      format="rectangle"
      style={{ minHeight: '250px' }}
    />
  );
}

export function ResponsiveAd() {
  return (
    <DisplayAd
      slot="1234567893"
      format="auto"
      style={{ minHeight: '100px' }}
    />
  );
} 