import React, { Suspense } from 'react';

import PostList from '@/app/blog/_components/PostList';
import Loading from '@/components/common/Loading';

const BlogPage = () => {
  return (
    <>
      <h1 className="text-center text-2xl font-bold mt-5">Blog</h1>
      <Suspense fallback={<Loading />}>
        <PostList />
      </Suspense>
    </>
  );
};

export default BlogPage;
