'use client';

import Link from 'next/link';

import { Post } from '@/types/types';

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <li className="w-full max-w-md">
      <Link href={`/blog/${post.id}`}>
        <article className="group flex h-full flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="mb-3">
            <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-gray-900 group-hover:text-primary-500">
              {post.title}
            </h3>
            <p className="line-clamp-3 text-sm text-gray-600">{post.content}</p>
          </div>

          {post.created_at && (
            <time className="mt-auto text-xs text-gray-400">
              {new Date(post.created_at).toLocaleDateString('ko-KR')}
            </time>
          )}
        </article>
      </Link>
    </li>
  );
};

export default PostCard;
