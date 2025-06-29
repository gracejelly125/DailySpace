'use client';

import { useEffect, useState, Fragment } from 'react';

import Link from 'next/link';

import { useAuth } from '@/providers/AuthProvider';

const HeaderClient = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/10 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto max-w-4xl flex justify-between items-center py-4 px-6"
        aria-label="주요 탐색"
      >
        <>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/" className="common-nav">
                홈
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link href="/todolist" className="common-nav">
                    투두리스트
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="common-nav">
                    블로그
                  </Link>
                </li>
              </>
            )}
          </ul>
        </>

        <>
          <ul className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <li>
                  <Link href="/mypage" className="common-btn inline-block">
                    마이페이지
                  </Link>
                </li>
                <li>
                  <button className="common-btn" onClick={() => logout()}>
                    로그아웃
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/sign-in" className="common-btn inline-block">
                  로그인
                </Link>
              </li>
            )}
          </ul>
        </>
      </nav>
    </header>
  );
};

export default HeaderClient;
