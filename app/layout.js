import './globals.css';

export const metadata = {
  title: 'zeko.ai — AI That Understands. Built for Humans.',
  description:
    'We build AI that listens, learns, and collaborates—enhancing human potential while strengthening the connections that matter most.',
  keywords: ['AI', 'artificial intelligence', 'machine learning', 'human-centered AI', 'zeko'],
  openGraph: {
    title: 'zeko.ai — AI That Understands. Built for Humans.',
    description:
      'We build AI that listens, learns, and collaborates—enhancing human potential while strengthening the connections that matter most.',
    type: 'website',
    locale: 'en_US',
    siteName: 'zeko.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'zeko.ai — AI That Understands. Built for Humans.',
    description:
      'We build AI that listens, learns, and collaborates—enhancing human potential while strengthening the connections that matter most.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to font CDN for faster loading */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
