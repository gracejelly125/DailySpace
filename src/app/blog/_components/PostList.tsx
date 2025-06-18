'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import PostCard from '@/app/blog/_components/PostCard';
import { fetchPostsData } from '@/app/blog/_utils/post';
import Loading from '@/components/common/Loading';
import { useAuthStore } from '@/store/useAuthStore';
import { Post } from '@/types/types';

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const isAuthenticated = useAuthStore();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const postsData = await fetchPostsData();

      setPosts(postsData);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  const handleGoToNewPost = () => {
    if (!isAuthenticated) {
      return;
    }
    router.push(`/blog/new`);
  };

  return (
    <section className="flex flex-col">
      <div className="mb-5 ml-auto">
        <button
          id="new-post-button"
          type="button"
          aria-label="게시글 작성"
          onClick={handleGoToNewPost}
          className="common-btn"
        >
          글작성
        </button>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {isLoading ? (
          <Loading />
        ) : posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <li className="col-span-full text-center text-gray-500">
            해당 카테고리에 대한 포스트가 없습니다.
          </li>
        )}
      </ul>
    </section>
  );
};

export default PostList;
