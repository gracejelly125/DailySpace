'use client';

import Link from 'next/link';

import { useAuth } from '@/providers/AuthProvider';

const HomeSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="text-center mt-10 px-4">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
        Welcome to Your Daily Space
      </h1>
      <p className="max-w-xl mx-auto text-lg text-gray-700 leading-relaxed">
        📝 <strong className="text-yellow-500">투두리스트</strong> 로 하루하루
        계획을 체계적으로 관리하고, <br />
        ✍️ <strong className="text-yellow-500">블로그</strong> 로
        나만의 소중한 이야기를 기록해보세요. <br />
        작지만 특별한 매일의 순간들을{' '}
        <em className="text-yellow-500">함께 담아가는 공간</em> 입니다.
      </p>

      <div className="mt-10 flex items-center justify-center">
        {isAuthenticated ? (
          <div className="flex gap-2">
            <Link href="/todolist" className="common-btn">
              To Do List
            </Link>
            <Link href="/blog" className="common-btn !px-9">
              Blog
            </Link>
          </div>
        ) : (
          <Link href="/sign-in" className="common-btn !px-9">
            로그인
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomeSection;
