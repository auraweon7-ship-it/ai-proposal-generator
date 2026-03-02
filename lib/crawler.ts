import * as cheerio from 'cheerio';

const MAX_CONTENT_LENGTH = 8000;
const FETCH_TIMEOUT_MS = 10000;

export interface CrawlData {
  title: string;
  description: string;
  content: string;
  url: string;
}

export async function crawlUrl(url: string): Promise<CrawlData> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  let html: string;
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: 페이지를 가져올 수 없습니다.`);
    }

    html = await response.text();
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다. (10초)');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }

  const $ = cheerio.load(html);

  // 불필요한 태그 제거
  $('script, style, nav, footer, header, aside, .ads, .advertisement, [class*="cookie"], [id*="cookie"]').remove();

  const title = $('title').text().trim() ||
    $('meta[property="og:title"]').attr('content') ||
    $('h1').first().text().trim() ||
    '제목 없음';

  const description = $('meta[name="description"]').attr('content') ||
    $('meta[property="og:description"]').attr('content') ||
    '';

  // 본문 텍스트 추출 (우선순위 순)
  const mainSelectors = ['main', 'article', '[role="main"]', '.content', '#content', '.main', 'body'];
  let rawText = '';

  for (const selector of mainSelectors) {
    const element = $(selector).first();
    if (element.length) {
      rawText = element.text();
      break;
    }
  }

  if (!rawText) {
    rawText = $('body').text();
  }

  // 텍스트 정제
  const content = rawText
    .replace(/\s+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, MAX_CONTENT_LENGTH);

  return {
    title: title.slice(0, 200),
    description: description.slice(0, 500),
    content,
    url,
  };
}
