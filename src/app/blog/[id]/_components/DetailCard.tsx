'use client';

import React, { useEffect, useState } from 'react';

import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
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
    const confirmed = window.confirm('정말로 포스트를 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      await deletePost(postDetailData!.id);
      router.push('/blog');
    } catch (error) {
      setIsError(true);
      console.error('포스트 삭제 실패:', error);
      toast.error('포스트 삭제에 실패했습니다.');
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="mt-10 text-center text-warn">
        데이터를 불러오는 중 문제가 발생했습니다.
      </div>
    );
  if (!postDetailData) return null;

  return (
    <section className="mx-auto mt-10 max-w-3xl px-4">
      <div className="mb-8 flex justify-between items-center">
        <button
          id="back-button"
          type="button"
          aria-label="뒤로 가기"
          onClick={() => router.push('/blog')}
          className="flex items-center justify-center rounded-md border border-postBorder bg-transparent p-2 text-textSub"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex gap-3">
          <Link
            href={`/blog/new?edit=${postDetailData.id}`}
            className="flex items-center gap-2 common-btn"
          >
            <Edit2 size={18} />
            수정
          </Link>

          <button
            id="delete-button"
            type="button"
            aria-label="삭제"
            onClick={handleDeletePost}
            className="flex items-center gap-2 warn-btn"
          >
            <Trash2 size={18} />
            삭제
          </button>
        </div>
      </div>

      <article className="flex flex-col border border-postBorder bg-postBg p-6 shadow-sm rounded-xl">
        <time className="ml-auto text-textSub">
          {dayjs(postDetailData.created_at).format(
            'YYYY년 M월 D일 dddd HH:mm:ss',
          )}
        </time>

        {postDetailData.image_url && postDetailData.image_url.length > 0 ? (
          <div className="flex flex-col md:flex-row mt-4">
            <div className="w-full md:flex-1 flex justify-center">
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

            <div className="w-full md:flex-1 flex flex-col justify-center">
              <h3 className="text-center text-xl font-bold text-textMain">
                {postDetailData.title}
              </h3>
              <p className="mt-2 text-center whitespace-pre-wrap text-textSub">
                {postDetailData.content}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex h-96 flex-col items-center justify-center text-center">
            <h2 className="mb-2 text-xl font-bold text-textMain">
              {postDetailData.title}
            </h2>
            <p className="text-textSub whitespace-pre-wrap">
              {postDetailData.content}
            </p>
          </div>
        )}
      </article>
    </section>
  );
};

export default DetailCard;
