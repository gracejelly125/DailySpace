import type { Metadata } from 'next';

import Layout from '@/components/layout/Layout';
import Provider from '@/providers/Provider';

import './globals.css';


export const metadata: Metadata = {
  title: 'To Do List',
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
