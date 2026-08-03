'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase';
import { Button } from '@/components/ui/button';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setMessage('로그인이 필요합니다.');
      return;
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({ title, content, user_id: user.id })
      .select()
      .single();

    if (error) {
      setMessage(`오류: ${error.message}`);
    } else {
      router.push(`/blog/${data.id}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">새 글 작성</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2"
          required
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border rounded p-2"
          rows={8}
          required
        />
        <Button type="submit">작성하기</Button>
      </form>
      {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
    </div>
  );
}