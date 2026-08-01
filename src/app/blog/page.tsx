import LikeButton from '../components/LikeButton';
import { Post } from '../../types/post';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import postsData from '../../data/posts.json';

const posts: Post[] = postsData;

export default function BlogPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">블로그</h1>
      {posts.map((post) => (
        <Card key={post.id} className="mb-4">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <p className="text-sm text-gray-400">{post.date}</p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{post.content}</p>
          </CardContent>
        </Card>
      ))}
      <LikeButton />
    </div>
  );
}