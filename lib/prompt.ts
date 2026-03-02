export const DEFAULT_PROPOSAL_PROMPT = `당신은 전문 비즈니스 제안서 작성 전문가입니다.
아래에 제공된 웹사이트 내용을 분석하여 해당 비즈니스/서비스에 대한 전문적인 협업 제안서를 작성해주세요.

## 분석할 웹사이트 정보
- URL: {SITE_URL}
- 사이트명: {SITE_TITLE}
- 내용:
{CRAWLED_CONTENT}

## 제안서 작성 요구사항
아래 구조를 Markdown 형식으로 작성해주세요:

1. **제안서 제목** (명확하고 임팩트 있게)
2. **수신** (사이트명 기반 추정 회사/담당자)
3. **제안 배경** (웹사이트 분석을 바탕으로 현황 및 기회 파악)
4. **협업 제안 내용** (구체적인 협업 방안 2~3가지)
5. **기대 효과** (수치나 결과 중심)
6. **다음 단계** (미팅 제안, 연락처 안내 등)

**작성 기준:**
- 톤앤매너: 전문적이고 신뢰감 있는 비즈니스 언어
- 언어: 한국어
- 분량: 실제 발송 가능한 수준의 완성도`;

export function buildPrompt(
  customPrompt: string,
  siteUrl: string,
  siteTitle: string,
  crawledContent: string
): string {
  return customPrompt
    .replace('{SITE_URL}', siteUrl)
    .replace('{SITE_TITLE}', siteTitle)
    .replace('{CRAWLED_CONTENT}', crawledContent);
}
