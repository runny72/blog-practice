import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { createServerSupabaseClient } from '../../lib/supabase-server';

export const metadata = {
  title: '블로그',
  description: '알고리즘 트레이딩 관련 글 모음',
};

export default async function BlogPage() {
  const supabase = await createServerSupabaseClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return <div className="p-6">글을 불러오지 못했습니다: {error.message}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">블로그</h1>
      {posts.map((post) => (
        <Link href={`/blog/${post.id}`} key={post.id}>
          <Card className="mb-4 hover:shadow-md transition cursor-pointer">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <p className="text-sm text-gray-400">
                {new Date(post.created_at).toLocaleDateString('ko-KR')}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{post.content}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}