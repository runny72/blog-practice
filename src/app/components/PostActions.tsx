'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase';
import { Button } from '@/components/ui/button';

export default function PostActions({ postId }: { postId: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    const supabase = createClient();
    const { error } = await supabase.from('posts').delete().eq('id', postId);

    if (error) {
      alert(`삭제 실패: ${error.message}`);
    } else {
      router.push('/blog');
      router.refresh();
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <Button variant="outline" onClick={() => router.push(`/blog/${postId}/edit`)}>
        수정
      </Button>
      <Button variant="destructive" onClick={handleDelete}>
        삭제
      </Button>
    </div>
  );
}