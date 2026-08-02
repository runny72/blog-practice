'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log('제출된 데이터:', data);
    alert(`문의가 접수됐습니다!\n이름: ${data.name}\n이메일: ${data.email}`);
    reset();
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">문의하기</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input
            placeholder="이름"
            {...register('name', { required: true })}
            className="border rounded p-2 w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">이름을 입력해주세요</p>}
        </div>

        <div>
          <input
            placeholder="이메일"
            {...register('email', { required: true })}
            className="border rounded p-2 w-full"
          />
          {errors.email && <p className="text-red-500 text-sm">이메일을 입력해주세요</p>}
        </div>

        <div>
          <textarea
            placeholder="문의 내용"
            {...register('message', { required: true })}
            className="border rounded p-2 w-full"
            rows={5}
          />
          {errors.message && <p className="text-red-500 text-sm">내용을 입력해주세요</p>}
        </div>

        <Button type="submit">제출</Button>
      </form>
    </div>
  );
}