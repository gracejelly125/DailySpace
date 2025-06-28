'use client';

import Link from 'next/link';

import { useAuth } from '@/providers/AuthProvider';

const HeaderClient = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="max-w-4xl mx-auto p-4 border-b">
      <nav className="flex justify-between items-center">
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
      </nav>
    </div>
  );
};

export default HeaderClient;
