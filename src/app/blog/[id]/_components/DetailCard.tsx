'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { deletePost, fetchPostDetail } from '@/app/blog/_utils/post';
import Loading from '@/components/common/Loading';
import { Post } from '@/types/types';

type DetailCardProps = {
  postId: Post['id'];
};

const DetailCard = ({ postId }: DetailCardProps) => {
  const [postDetailData, setPostDetailData] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const router = useRouter();

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
            className="common-btn !bg-red-600 hover:!bg-red-500"
          >
            삭제
          </button>
        </div>
      </div>

      <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          {postDetailData.title}
        </h2>
        <p className="whitespace-pre-wrap text-gray-700">
          {postDetailData.content}
        </p>
      </article>
    </section>
  );
};

export default DetailCard;
