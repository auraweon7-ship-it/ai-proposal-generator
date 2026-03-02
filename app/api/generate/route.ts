import { NextRequest, NextResponse } from 'next/server';
import { generateProposalFromPrompt } from '@/lib/openrouter';
import { DEFAULT_PROPOSAL_PROMPT, buildPrompt } from '@/lib/prompt';
import { GenerateRequest } from '@/types';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { crawledContent, siteTitle, siteUrl, customPrompt } = body;

    if (!crawledContent || !siteUrl) {
      return NextResponse.json(
        { error: '크롤링된 내용과 URL이 필요합니다.' },
        { status: 400 }
      );
    }

    const promptTemplate = customPrompt || DEFAULT_PROPOSAL_PROMPT;
    const finalPrompt = buildPrompt(promptTemplate, siteUrl, siteTitle, crawledContent);

    const proposal = await generateProposalFromPrompt(finalPrompt);

    return NextResponse.json({
      proposal,
      model: 'anthropic/claude-opus-4-6',
      promptUsed: promptTemplate,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : '제안서 생성 중 오류가 발생했습니다.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
