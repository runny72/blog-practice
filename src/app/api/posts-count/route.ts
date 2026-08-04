import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '../../../lib/supabase-server';

export async function GET() {
  const supabase = await createServerSupabaseClient();
  const { count, error } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ count });
}