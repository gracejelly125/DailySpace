'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useAuth } from '@/providers/AuthProvider';

const HomeSection = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="text-center mt-10 px-4">
      <motion.h1
        className="text-3xl font-extrabold mb-6 text-textBlack"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        Welcome to Your Daily Space
      </motion.h1>

      <motion.p
        className="hidden md:block max-w-xl mx-auto text-lg text-textMain leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        📝 <strong className="text-primary">투두리스트</strong> 로 하루하루
        계획을 체계적으로 관리하고, <br />
        ✍️ <strong className="text-primary">블로그</strong> 로 나만의 소중한
        이야기를 기록해보세요. <br />
        작지만 특별한 매일의 순간들을{' '}
        <em className="text-primary">함께 담아가는 공간</em> 입니다.
      </motion.p>

      <motion.p
        className="block md:hidden max-w-xl mx-auto text-lg text-textMain leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        📝 <strong className="text-primary">투두리스트</strong> 로 하루하루
        계획을
        <br /> 체계적으로 관리하고, <br />
        ✍️ <strong className="text-primary">블로그</strong> 로 나만의 소중한
        이야기를
        <br /> 기록해보세요. <br />
        작지만 특별한 매일의 순간들을
        <br />
        <em className="text-primary">함께 담아가는 공간</em> 입니다.
      </motion.p>

      <div className="mt-10 flex items-center justify-center">
        {isAuthenticated ? (
          <div className="flex gap-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            >
              <Link href="/todolist" className="common-btn !py-3">
                To Do List
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
            >
              <Link href="/blog" className="common-btn !px-9 !py-3">
                Blog
              </Link>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          >
            <Link href="/sign-in" className="common-btn !px-9 !py-3">
              로그인
            </Link>
          </motion.div>
        )}
      </div>
      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.8 }}
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={10}
          className="max-w-lg mx-auto"
        >
          <SwiperSlide className="flex justify-center">
            <Image
              src="/assets/todolist.PNG"
              alt="투두리스트 사용 예시"
              width={500}
              height={500}
              className="object-contain"
            />
          </SwiperSlide>
          <SwiperSlide className="flex justify-center">
            <Image
              src="/assets/blog.PNG"
              alt="블로그 사용 예시"
              width={500}
              height={500}
              className="object-contain"
            />
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </div>
  );
};

export default HomeSection;
