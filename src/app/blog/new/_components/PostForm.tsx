'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { updatePost } from '@/app/blog/_actions/update';
import { addPost, uploadPostImageFile } from '@/app/blog/_utils/post';
import Loading from '@/components/common/Loading';
import { Post } from '@/types/types';

type PostFormProps = {
  postDetailData: Post | null;
};

const PostForm = ({ postDetailData }: PostFormProps) => {
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const isEditMode = Boolean(editId);

  const [title, setTitle] = useState<string>(
    isEditMode ? '' : postDetailData?.title || '',
  );
  const [content, setContent] = useState<string>(
    isEditMode ? '' : postDetailData?.content || '',
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(
    isEditMode ? [] : postDetailData?.image_url || [],
  );
  const [isFetching, setIsFetching] = useState<boolean>(isEditMode);

  const router = useRouter();

  useEffect(() => {
    if (!editId) return;

    const fetchLatestPost = async () => {
      try {
        const res = await fetch(`/api/posts/${editId}`, {
          cache: 'no-store',
        });
        const data = await res.json();

        setTitle(data.title);
        setContent(data.content);
        setImageUrls(data.image_url || []);
        setImages([]);
      } catch (err) {
        console.error('최신 포스트 불러오기 실패:', err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchLatestPost();
  }, [editId]);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    setIsLoading(true);

    try {
      const uploadedImageUrls = await Promise.all(
        images.map(async (image) => {
          const publicUrl = await uploadPostImageFile(image);
          return publicUrl;
        }),
      );

      const finalImageUrls = uploadedImageUrls.filter(Boolean) as string[];

      const imageUrlsToSave = [
        ...imageUrls.filter((url) => !url.startsWith('blob:')),
        ...finalImageUrls,
      ];

      if (isEditMode && postDetailData) {
        await updatePost({
          postId: postDetailData.id,
          updatedTitle: title,
          updatedContent: content,
          updatedPostImageUrl: imageUrlsToSave,
          userId: postDetailData.user_id,
        });
        router.push(`/blog/${postDetailData.id}`);
      } else {
        await addPost({
          newTitle: title,
          newContent: content,
          newPostImageUrl: imageUrlsToSave,
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
      isEditMode && postDetailData ? `/blog/${postDetailData.id}` : '/blog',
    );
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.target.files && e.target.files[0] instanceof File) {
      const newImages = [...images];
      newImages[index] = e.target.files[0];
      setImages(newImages);

      const newImageUrls = [...imageUrls];
      newImageUrls[index] = URL.createObjectURL(e.target.files[0]);
      setImageUrls(newImageUrls);
    }
  };

  const handleImageDelete = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };

  const isSubmitDisabled = !title.trim() || !content.trim() || isLoading;

  if (isFetching) {
    return <Loading />;
  }

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
          <label htmlFor="title" className="text-textMain">
            제목
          </label>
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

        <section className="mb-4">
          <label htmlFor="content" className="text-textMain">
            내용
          </label>
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

        <section className="mx-auto grid flex-1 grid-cols-3 gap-4">
          {[0, 1, 2].map((index) => (
            <article key={index} className="relative w-full">
              <label
                htmlFor={`image-upload-${index}`}
                className="flex aspect-square cursor-pointer items-center justify-center rounded-md border border-gray-300"
              >
                {imageUrls[index] ? (
                  <Image
                    src={imageUrls[index]}
                    alt={`Preview ${index}`}
                    width={200}
                    height={200}
                    className="h-full w-full rounded-md object-cover"
                  />
                ) : (
                  <span className="text-gray-500">➕</span>
                )}
                <input
                  id={`image-upload-${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  className="hidden"
                />
              </label>

              {imageUrls[index] && (
                <button
                  type="button"
                  aria-label="이미지 삭제"
                  onClick={() => handleImageDelete(index)}
                  className="absolute right-2 top-2 p-1 text-black"
                >
                  ❌
                </button>
              )}
            </article>
          ))}
        </section>
      </form>
    </div>
  );
};

export default PostForm;
