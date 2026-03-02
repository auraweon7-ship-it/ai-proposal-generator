import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const supabase = createServerClient();

    const { data, error, count } = await supabase
      .from('proposals')
      .select('id, title, source_url, source_name, model_used, created_at', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ proposals: data, total: count });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : '목록 조회 중 오류가 발생했습니다.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, sourceUrl, sourceName, content, promptUsed } = body;

    if (!title || !sourceUrl || !content) {
      return NextResponse.json(
        { error: '제목, URL, 내용이 필요합니다.' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('proposals')
      .insert({
        title,
        source_url: sourceUrl,
        source_name: sourceName || null,
        content,
        prompt_used: promptUsed || null,
        model_used: 'anthropic/claude-opus-4-6',
      })
      .select('id, created_at')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : '저장 중 오류가 발생했습니다.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
