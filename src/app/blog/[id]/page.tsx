import LikeButton from '../../components/LikeButton';
import { Post } from '../../../types/post';
import postsData from '../../../data/posts.json';

const posts: Post[] = postsData;

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return <div className="p-6">글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-4">{post.date}</p>
      <p className="text-gray-700 mb-6">{post.content}</p>
      <LikeButton />
    </div>
  );
}