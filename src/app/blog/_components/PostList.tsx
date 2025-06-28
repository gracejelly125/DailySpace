'use client';

import React, { useEffect, useState } from 'react';

import PostCard from '@/app/blog/_components/PostCard';
import { fetchPostsData } from '@/app/blog/_utils/post';
import Loading from '@/components/common/Loading';
import { useAuthStore } from '@/store/useAuthStore';
import { Post } from '@/types/types';
import { useRouter } from 'next/navigation';

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
          📝 글작성
        </button>
      </div>
      <ul className="flex flex-wrap gap-5 p-2">
        {isLoading ? (
          <Loading />
        ) : posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <li className="text-gray-500 mx-auto">
            아무리 짧아도 좋아요! 오늘 느낀 감정 하나만 적어도 충분해요 😊
          </li>
        )}
      </ul>
    </section>
  );
};

export default PostList;
