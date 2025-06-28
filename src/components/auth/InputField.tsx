'use client';

import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type InputFieldProps<T extends FieldValues> = {
  id: Path<T>;
  label: string;
  type?: string;
  register: UseFormRegister<T>;
  error?: string;
};

const InputField = <T extends FieldValues>({
  id,
  label,
  type = 'text',
  register,
  error,
}: InputFieldProps<T>) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isPassword = type === 'password';

  return (
    <div className="flex flex-col gap-1">
      <label className="text-title-mm" htmlFor={id as string}>
        {label}
      </label>

      <div className="relative">
        <input
          className={`common-input w-full rounded-[8px] border p-3 text-caption-lm focus:outline-none ${
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-gray-900'
          }`}
          type={isPassword && isVisible ? 'text' : type}
          id={id as string}
          autoComplete="off"
          {...register(id)}
        />

        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setIsVisible(!isVisible)}
            aria-label="비밀번호 보기"
          >
            {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>

      <p className="min-h-[20px] text-sm text-red-500">{error ?? '\u00A0'}</p>
    </div>
  );
};

export default InputField;
