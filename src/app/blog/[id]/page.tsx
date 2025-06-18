import React from 'react';

import DetailCard from '@/app/blog/[id]/_components/DetailCard';

type DetailPageProps = {
  params: {
    id: string;
  };
};

const DetailPage = ({ params }: DetailPageProps) => {
  const postId = params.id;
  return <DetailCard postId={postId} />;
};

export default DetailPage;
