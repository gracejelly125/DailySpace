'use client';

import React from 'react';

import Link from 'next/link';

import useDayjs from '@/hooks/useDayjs';
import { Post } from '@/types/types';

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const dayjs = useDayjs();

  return (
    <li className="relative w-[250px] h-[250px]">
      <Link href={`/blog/${post.id}`}>
        <article className="group flex h-full flex-col justify-between border border-gray-300 bg-white p-5 shadow-md transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
          <span
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-2xl drop-shadow"
            aria-hidden="true"
          >
            🌼
          </span>

          <div className="mb-3 mt-2">
            <h3 className="mb-1 line-clamp-1 text-lg font-semibold text-gray-900 group-hover:text-primary-500">
              {post.title}
            </h3>
            <p className="line-clamp-5 text-sm text-gray-600">{post.content}</p>
          </div>

          {post.created_at && (
            <time className="mt-auto ml-auto text-xs text-gray-400">
              {dayjs(post.created_at).format('YYYY년 M월 D일 dddd HH:mm:ss')}
            </time>
          )}
        </article>
      </Link>
    </li>
  );
};

export default PostCard;
