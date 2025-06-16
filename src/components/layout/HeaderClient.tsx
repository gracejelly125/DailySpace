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
            <Link className="py-2 px-4 rounded-lg inline-block" href="/">
              홈
            </Link>
          </li>
          <li>
            <Link className="" href="/todolist">
              투두
            </Link>
          </li>
        </ul>
        <ul className="flex gap-4">
          {isAuthenticated ? (
            <>
              <li>
                <Link className="common-btn inline-block" href="/mypage">
                  마이페이지
                </Link>
              </li>
              <li>
                <button
                  className="common-btn"
                  onClick={() => {
                    logout();
                  }}
                >
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="common-btn inline-block" href="/sign-in">
                  로그인
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default HeaderClient;
