CREATE TABLE prompt_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON prompt_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS 활성화
ALTER TABLE prompt_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read"
  ON prompt_templates FOR SELECT USING (true);

CREATE POLICY "Public insert"
  ON prompt_templates FOR INSERT WITH CHECK (true);

CREATE POLICY "Public update"
  ON prompt_templates FOR UPDATE USING (true);

-- 기본 템플릿 삽입
INSERT INTO prompt_templates (name, description, content, is_default) VALUES (
  '기본 제안서 템플릿',
  'AI가 웹사이트 정보를 분석하여 비즈니스 제안서를 작성하는 기본 템플릿',
  '당신은 전문 비즈니스 컨설턴트입니다. 아래 웹사이트 정보를 바탕으로 비즈니스 제안서를 작성해주세요.

## 웹사이트 정보
- URL: {SITE_URL}
- 사이트명: {SITE_TITLE}

## 웹사이트 내용
{CRAWLED_CONTENT}

---

위 정보를 바탕으로 다음 항목을 포함한 전문적인 비즈니스 제안서를 한국어로 작성해주세요:

1. **회사/서비스 개요** - 핵심 가치와 포지셔닝
2. **제안 배경 및 목적** - 현재 상황과 필요성
3. **핵심 제안 내용** - 구체적인 솔루션 또는 협업 방안
4. **기대 효과 및 이점** - 정량적/정성적 효과
5. **실행 계획** - 단계별 추진 일정
6. **결론** - 핵심 메시지와 다음 단계

전문적이고 설득력 있는 문체로 작성하되, 실질적인 내용을 담아주세요.',
  true
);
