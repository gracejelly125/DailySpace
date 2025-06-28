import React from 'react';

import { fetchPostDetail } from '@/app/blog/_utils/post';
import PostForm from '@/app/blog/new/_components/PostForm';

type NewPageProps = {
  searchParams: {
    edit: string;
  };
};

const NewPage = async ({ searchParams }: NewPageProps) => {
  const postDetailData = await fetchPostDetail(searchParams.edit);

  return (
    <>
      <h1 className="text-center text-2xl font-bold mt-5">
        {searchParams.edit ? 'Update Post' : 'New Post'}
      </h1>
      <PostForm postDetailData={postDetailData} />
    </>
  );
};

export default NewPage;
