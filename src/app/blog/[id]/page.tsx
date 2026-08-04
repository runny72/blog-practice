import LikeButton from '../../components/LikeButton';
import PostActions from '../../components/PostActions';
import CommentSection from '../../components/CommentSection';
import { createServerSupabaseClient } from '../../../lib/supabase-server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: post } = await supabase.from('posts').select('*').eq('id', id).single();

  return {
    title: post ? post.title : '글을 찾을 수 없습니다',
    description: post ? post.content.slice(0, 100) : '',
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: post } = await supabase.from('posts').select('*').eq('id', id).single();
  const { data: { user } } = await supabase.auth.getUser();

  if (!post) {
    return <div className="p-6">글을 찾을 수 없습니다.</div>;
  }

  const isAuthor = user && user.id === post.user_id;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-4">
        {new Date(post.created_at).toLocaleDateString('ko-KR')}
      </p>
      {post.image_url && (
        <img src={post.image_url} alt={post.title} className="w-full rounded-lg mb-4" />
      )}
      <p className="text-gray-700 mb-6">{post.content}</p>
      <LikeButton />
      {isAuthor && <PostActions postId={post.id} />}
      <CommentSection postId={post.id} />
    </div>
  );
}