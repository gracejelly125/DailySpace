'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import PostCard from '@/app/blog/_components/PostCard';
import { fetchPostsData } from '@/app/blog/_utils/post';
import Loading from '@/components/common/Loading';
import useAuthStore from '@/store/useAuthStore';
import { Post } from '@/types/types';

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user?.id) {
        setPosts([]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const postsData = await fetchPostsData(user.id);
        setPosts(postsData);
      } catch (error) {
        console.error('포스트 데이터 불러오기 실패:', error);
        setPosts([]);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [user?.id]);

  const handleGoToNewPost = () => {
    if (!isLoggedIn) {
      return;
    }
    router.push(`/blog/new`);
  };

  return (
    <section className="flex flex-col p-4">
      <div className="mt-5 mb-10 ml-auto mr-5">
        <button
          id="new-post-button"
          type="button"
          aria-label="게시글 작성"
          onClick={handleGoToNewPost}
          className="common-btn"
        >
          ✍️ New Post
        </button>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-auto">
        {isLoading ? (
          <Loading />
        ) : posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <li className="text-textSub mx-auto col-span-full text-center">
            아무리 짧아도 좋아요! 오늘 느낀 감정 하나만 적어도 충분해요 😊
          </li>
        )}
      </ul>
    </section>
  );
};

export default PostList;
