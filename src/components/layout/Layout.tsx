'use client';

import { useEffect, useState } from 'react';

import IntroSplash from '@/components/home/IntroSplash';
import Header from '@/components/layout/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isIntroVisible) {
    return <IntroSplash />;
  }

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto p-4">{children}</main>
    </>
  );
};

export default Layout;
