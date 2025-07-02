import { v4 as uuidv4 } from 'uuid';

import { getId } from '@/app/todolist/_utils/auth';
import { Post } from '@/types/types';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export const fetchPostsData = async (userId: string): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

export const uploadPostImageFile = async (file: File) => {
  try {
    const compressedFile = await convertImageFormat(file, 'image/webp');

    const { data: imageData, error: uploadError } = await supabase.storage
      .from('post')
      .upload(`${uuidv4()}.webp`, compressedFile);

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from('post')
      .getPublicUrl(imageData.path);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('이미지 스토리지 저장 실패:', error);
    throw error;
  }
};

const convertImageFormat = (file: File, format: string): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      img.src = reader.result as string;
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: format,
              lastModified: file.lastModified,
            });
            resolve(compressedFile);
          } else {
            reject('Blob conversion failed.');
          }
        },
        format,
        0.7,
      );
    };
  });
};

type addPostProps = {
  newTitle: Post['title'];
  newContent: Post['content'];
  newPostImageUrl: Post['image_url'];
};

export const addPost = async ({
  newTitle,
  newContent,
  newPostImageUrl,
}: addPostProps) => {
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
          image_url: newPostImageUrl,
          user_id: user_id,
        },
      ])
      .select();

    if (error) throw error;

    return postsData;
  } catch (error) {
    console.error('포스트 저장 실패:', error);
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
    console.error('포스트 디테일 불러오기 실패:', error);
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
    console.error('포스트 삭제 실패:', error);
    throw error;
  }
};
