'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { updatePost } from '@/app/blog/_actions/update';
import { addPost } from '@/app/blog/_utils/post';
import { Post } from '@/types/types';

type PostFormProps = {
  postDetailData: Post | null;
};

const PostForm = ({ postDetailData }: PostFormProps) => {
  const [title, setTitle] = useState<string>(postDetailData?.title || '');
  const [content, setContent] = useState<string>(postDetailData?.content || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const mode = postDetailData ? 'edit' : 'create';

  useEffect(() => {
    if (mode === 'edit' && postDetailData) {
      setTitle(postDetailData.title);
      setContent(postDetailData.content);
    }
  }, [mode, postDetailData]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    setIsLoading(true);

    try {
      if (mode === 'edit' && postDetailData) {
        await updatePost({
          postId: postDetailData.id,
          updatedTitle: title,
          updatedContent: content,
          userId: postDetailData.user_id,
        });
        router.push(`/blog/${postDetailData.id}`);
      } else {
        await addPost({
          newTitle: title,
          newContent: content,
        });
        router.push('/blog');
      }
    } catch (error) {
      console.error('게시글 저장 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(
      mode === 'edit' && postDetailData
        ? `/blog/${postDetailData.id}`
        : '/blog',
    );
  };

  const isSubmitDisabled = !title.trim() || !content.trim() || isLoading;

  return (
    <div className="mx-5">
      <form className="mt-5">
        <section className="mb-6 flex items-center justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="common-btn"
            disabled={isLoading}
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={`common-btn ${
              isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitDisabled}
          >
            {isLoading ? '저장 중...' : '저장'}
          </button>
        </section>

        <section className="mb-4 mt-8">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요."
            className="common-input w-full"
            disabled={isLoading}
          />
        </section>

        <section>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요."
            className="common-input w-full resize-none"
            rows={10}
            disabled={isLoading}
          />
        </section>
      </form>
    </div>
  );
};

export default PostForm;
