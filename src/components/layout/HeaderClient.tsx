'use client';

import { useEffect, useState } from 'react';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';

import { useAuth } from '@/providers/AuthProvider';

const HeaderClient = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        isScrolled ? 'bg-background/10 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto max-w-4xl flex justify-between items-center py-3 px-6"
        aria-label="사용자 메뉴"
      >
        <div className="flex gap-4">
          <Link href="/" className="common-nav !text-primary text-lg font-bold">
            홈
          </Link>

          <ul className="hidden md:flex items-center gap-4">
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
        </div>

        <ul className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <li>
                <Link href="/mypage" className="common-btn inline-block">
                  마이페이지
                </Link>
              </li>
              <li>
                <button className="warn-btn" onClick={logout}>
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

        {/* 모바일 메뉴 버튼 */}
        <button
          className="md:hidden focus:outline-none"
          aria-label="모바일 메뉴 토글"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
      </nav>

      {/* 모바일 메뉴 영역 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/90 backdrop-blur-md px-6 pb-6 -mt-2">
          <ul className="flex flex-col">
            {isAuthenticated && (
              <>
                <li>
                  <Link
                    href="/todolist"
                    className="common-nav block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    투두리스트
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="common-nav block mb-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    블로그
                  </Link>
                </li>
              </>
            )}
            <li className="px-3">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/mypage"
                    className="common-btn block text-center mb-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    마이페이지
                  </Link>
                  <button
                    className="warn-btn w-full"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <Link
                  href="/sign-in"
                  className="common-btn block text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  로그인
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default HeaderClient;
