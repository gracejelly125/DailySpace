'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { Post } from '@/types/types';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

type updatePostProps = {
  updatedTitle: Post['title'];
  updatedContent: Post['content'];
  postId: Post['id'];
  userId: Post['user_id'];
};

export const updatePost = async ({
  postId,
  updatedTitle,
  updatedContent,
  userId,
}: updatePostProps) => {
  try {
    const { error } = await supabase
      .from('posts')
      .update({
        title: updatedTitle,
        content: updatedContent,
        user_id: userId,
      })
      .eq('id', postId)
      .select();

    if (error) {
      console.error('포스트 업데이트에 실패했습니다.', error);
      throw error;
    }

    revalidatePath(`/blog/${postId}`);
    redirect(`/blog/${postId}`);
  } catch (error) {
    console.error('포스트 업데이트 중 에러가 발생했습니다.', error);
    throw error;
  }
};
