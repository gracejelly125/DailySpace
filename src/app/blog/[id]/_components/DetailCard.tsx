'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { deletePost, fetchPostDetail } from '@/app/blog/_utils/post';
import Loading from '@/components/common/Loading';
import useDayjs from '@/hooks/useDayjs';
import { Post } from '@/types/types';

type DetailCardProps = {
  postId: Post['id'];
};

const DetailCard = ({ postId }: DetailCardProps) => {
  const [postDetailData, setPostDetailData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const router = useRouter();
  const dayjs = useDayjs();

  useEffect(() => {
    const fetchPostDetailData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const postDetailData = await fetchPostDetail(postId);
        setPostDetailData(postDetailData);
      } catch (error) {
        setIsError(true);
        console.error(
          '디테일 데이터를 불러오는 중 문제가 발생했습니다.',
          error,
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostDetailData();
  }, [postId]);

  const handleDeletePost = async () => {
    const confirmed = window.confirm('정말로 게시물을 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      await deletePost(postDetailData!.id);
      router.push('/blog');
    } catch (error) {
      setIsError(true);
      console.error('게시물 삭제에 실패했습니다.', error);
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="mt-10 text-center text-red-500">
        데이터를 불러오는 중 문제가 발생했습니다.
      </div>
    );
  if (!postDetailData) return null;

  return (
    <section className="mx-auto mt-10 max-w-3xl px-4">
      <div className="mb-5 flex justify-between">
        <button
          id="back-button"
          type="button"
          aria-label="뒤로 가기"
          onClick={() => router.push('/blog')}
          className="common-btn !rounded-full"
        >
          ←
        </button>
        <div className="flex gap-2">
          <Link
            href={`/blog/new?edit=${postDetailData.id}`}
            className="common-btn !py-2.5"
          >
            수정
          </Link>
          <button
            id="delete-button"
            type="button"
            aria-label="삭제"
            onClick={handleDeletePost}
            className="common-btn !bg-red-500 hover:!bg-red-600"
          >
            삭제
          </button>
        </div>
      </div>

      <article className="flex flex-col border border-gray-200 bg-white p-6 shadow-sm">
        <time className="ml-auto text-gray-400">
          {dayjs(postDetailData.created_at).format(
            'YYYY년 M월 D일 dddd HH:mm:ss',
          )}
        </time>

        {postDetailData.image_url && postDetailData.image_url.length > 0 ? (
          <div className="flex">
            <div className="flex-1">
              <Swiper
                modules={[Pagination, Navigation]}
                navigation={true}
                spaceBetween={10}
                slidesPerView={1}
                simulateTouch={true}
                grabCursor={true}
                centeredSlides={true}
                pagination={{ clickable: true }}
                className="mx-auto my-4 flex h-auto max-w-[300px] items-center !pb-8"
              >
                {postDetailData.image_url.map((imageUrl, index) => (
                  <SwiperSlide key={index} className="my-auto">
                    <Image
                      src={imageUrl}
                      alt={`게시물 이미지 ${index + 1}`}
                      width={500}
                      height={500}
                      priority
                      className="mx-auto object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex-1">
              <h2 className="mt-6 text-center text-xl font-bold text-gray-900">
                {postDetailData.title}
              </h2>
              <p className="mt-2 text-center whitespace-pre-wrap text-gray-700">
                {postDetailData.content}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex h-96 flex-col items-center justify-center text-center">
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              {postDetailData.title}
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {postDetailData.content}
            </p>
          </div>
        )}
      </article>
    </section>
  );
};

export default DetailCard;
