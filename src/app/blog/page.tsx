import { Post } from '../../types/post';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import postsData from '../../data/posts.json';
import Link from 'next/link';

export const metadata = {
  title: '블로그',
  description: '알고리즘 트레이딩 관련 글 모음',
};

const posts: Post[] = postsData;

export default function BlogPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">블로그</h1>
      {posts.map((post) => (
        <Link href={`/blog/${post.id}`} key={post.id}>
          <Card className="mb-4 hover:shadow-md transition cursor-pointer">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <p className="text-sm text-gray-400">{post.date}</p>
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