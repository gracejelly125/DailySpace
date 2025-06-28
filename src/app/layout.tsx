import type { Metadata } from 'next';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import '@/app/globals.css';
import Layout from '@/components/layout/Layout';
import Provider from '@/providers/Provider';

export const metadata: Metadata = {
  title: 'Daily Space',
  description: '개인 프로젝트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
