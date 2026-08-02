import { createServerSupabaseClient } from '../../lib/supabase-server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">대시보드</h1>
      <p>안녕하세요, {user.email}님! 이 페이지는 로그인한 사람만 볼 수 있어요.</p>
    </div>
  );
}