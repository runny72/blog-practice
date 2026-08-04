'use client';

import { useState, useEffect } from 'react';
import { createClient } from '../../lib/supabase';
import { Button } from '@/components/ui/button';

interface Comment {
  id: number;
  content: string;
  created_at: string;
  user_id: string;
}

export default function CommentSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    setComments(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();

    const supabase = createClient();
    const channel = supabase
      .channel(`comments-${postId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `post_id=eq.${postId}` },
        (payload) => {
          setComments((prev) => [...prev, payload.new as Comment]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    const { error } = await supabase
      .from('comments')
      .insert({ content: newComment, post_id: postId, user_id: user.id });

    if (error) {
      alert(`댓글 등록 실패: ${error.message}`);
    } else {
      setNewComment('');
      // fetchComments() 호출 필요 없음 — Realtime이 자동으로 반영해줌
    }
  };

  if (loading) return <p>댓글 불러오는 중...</p>;

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-lg font-bold mb-4">댓글 {comments.length}개</h2>

      {comments.map((comment) => (
        <div key={comment.id} className="mb-3 p-3 bg-gray-50 rounded">
          <p>{comment.content}</p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(comment.created_at).toLocaleString('ko-KR')}
          </p>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          className="border rounded p-2 flex-1"
          required
        />
        <Button type="submit">등록</Button>
      </form>
    </div>
  );
}