'use client';

import { useEffect, useState } from 'react';

import IntroSplash from '@/components/home/IntroSplash';
import Header from '@/components/layout/Header';
import useCheckAuth from '@/hooks/useCheckAuth';
import TQProvider from '@/providers/TQProvider';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useCheckAuth(!isIntroVisible);

  if (isIntroVisible) {
    return <IntroSplash />;
  }

  return (
    <div className="bg-background min-h-screen">
      <Header />
      <TQProvider>
        <main className="max-w-4xl mx-auto pt-20 px-5 pb-10">{children}</main>
      </TQProvider>
    </div>
  );
};

export default Layout;
