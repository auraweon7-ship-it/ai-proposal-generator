import { NextRequest, NextResponse } from 'next/server';
import { crawlUrl } from '@/lib/crawler';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL이 필요합니다.' }, { status: 400 });
    }

    // URL 유효성 검증
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: '유효하지 않은 URL입니다.' }, { status: 400 });
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: 'http 또는 https URL만 지원합니다.' }, { status: 400 });
    }

    const result = await crawlUrl(url);

    if (!result.content || result.content.length < 50) {
      return NextResponse.json(
        { error: '페이지에서 충분한 텍스트를 추출하지 못했습니다. JavaScript로 렌더링되는 사이트는 지원되지 않을 수 있습니다.' },
        { status: 422 }
      );
    }

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
