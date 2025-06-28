'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import BlogImage from '@/assets/images/blog.jpg';
import TodolistImage from '@/assets/images/todolist.jpg';
import { useAuth } from '@/providers/AuthProvider';

const HomeSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="text-center mt-10 px-4">
      <motion.h1
        className="text-3xl font-extrabold mb-6 text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Welcome to Your Daily Space
      </motion.h1>

      <motion.p
        className="max-w-xl mx-auto text-lg text-gray-700 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        📝 <strong className="text-yellow-500">투두리스트</strong> 로 하루하루
        계획을 체계적으로 관리하고, <br />
        ✍️ <strong className="text-yellow-500">블로그</strong> 로 나만의 소중한
        이야기를 기록해보세요. <br />
        작지만 특별한 매일의 순간들을{' '}
        <em className="text-yellow-500">함께 담아가는 공간</em> 입니다.
      </motion.p>

      <div className="mt-10 flex items-center justify-center">
        {isAuthenticated ? (
          <div className="flex gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.5, ease: 'easeOut' }}
            >
              <Link href="/todolist" className="common-btn !py-3">
                To Do List
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.7, ease: 'easeOut' }}
            >
              <Link href="/blog" className="common-btn !px-9 !py-3">
                Blog
              </Link>
            </motion.div>
          </div>
        ) : (
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, delay: 0.5, ease: 'easeOut' }}
            >
              <Link href="/sign-in" className="common-btn !px-9 !py-3">
                로그인
              </Link>
            </motion.div>
            <div className="mt-14 flex flex-wrap gap-5 justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.2 }}
              >
                <Image
                  src={TodolistImage}
                  alt="투두리스트 사용 예시"
                  width={400}
                  height={300}
                  className="object-contain"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.6 }}
              >
                <Image
                  src={BlogImage}
                  alt="블로그 사용 예시"
                  width={400}
                  height={300}
                  className="object-contain"
                />
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeSection;
