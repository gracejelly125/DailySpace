import { getId } from '@/app/todolist/_utils/auth';
import { Post } from '@/types/types';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const fetchPostsData = async () => {
  try {
    const { data: postsData, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return postsData;
  } catch (error) {
    console.error('포스트 불러오기에 실패했습니다.', error);
    throw error;
  }
};

type addPostProps = {
  newTitle: Post['title'];
  newContent: Post['content'];
};

export const addPost = async ({ newTitle, newContent }: addPostProps) => {
  try {
    const user_id = await getId();

    if (!user_id) {
      throw new Error('유저 아이디를 찾을 수 없습니다.');
    }

    const { data: postsData, error } = await supabase
      .from('posts')
      .insert([
        {
          title: newTitle,
          content: newContent,
          user_id: user_id,
        },
      ])
      .select();

    if (error) throw error;

    return postsData;
  } catch (error) {
    console.error('포스트 저장에 실패했습니다.', error);
    throw error;
  }
};

export const fetchPostDetail = async (id: Post['id']) => {
  try {
    if (!id) return null;

    const { data: detailData, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return detailData;
  } catch (error) {
    console.error('포스트 디테일 불러오기에 실패했습니다.', error);
    throw error;
  }
};

export const deletePost = async (id: Post['id']) => {
  try {
    const { data: detailData, error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return detailData;
  } catch (error) {
    console.error('포스트 삭제에 실패했습니다.', error);
    throw error;
  }
};
