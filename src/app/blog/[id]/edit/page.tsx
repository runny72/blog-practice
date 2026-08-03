'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClient } from '../../../../lib/supabase';
import { Button } from '@/components/ui/button';

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const supabase = createClient();
      const { data } = await supabase.from('posts').select('*').eq('id', params.id).single();
      if (data) {
        setTitle(data.title);
        setContent(data.content);
      }
      setLoading(false);
    };
    fetchPost();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    const { error } = await supabase
      .from('posts')
      .update({ title, content })
      .eq('id', params.id);

    if (error) {
      alert(`수정 실패: ${error.message}`);
    } else {
      router.push(`/blog/${params.id}`);
      router.refresh();
    }
  };

  if (loading) return <div className="p-6">불러오는 중...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">글 수정</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border rounded p-2"
          rows={8}
          required
        />
        <Button type="submit">수정 완료</Button>
      </form>
    </div>
  );
}