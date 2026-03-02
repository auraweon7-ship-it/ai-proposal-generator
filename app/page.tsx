'use client';

import { useProposalGenerator } from '@/hooks/useProposalGenerator';
import UrlInput from '@/components/features/UrlInput';
import PromptEditor from '@/components/features/PromptEditor';
import ProposalResult from '@/components/features/ProposalResult';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import StepIndicator from '@/components/ui/StepIndicator';
import Link from 'next/link';

const STEPS = [
  { id: 1, label: 'URL 분석' },
  { id: 2, label: '프롬프트' },
  { id: 3, label: '제안서 생성' },
];

export default function HomePage() {
  const {
    status,
    crawlResult,
    proposal,
    customPrompt,
    error,
    isSaving,
    isSaved,
    setCrawlResult,
    setCustomPrompt,
    generate,
    save,
    reset,
  } = useProposalGenerator();

  const isGenerating = status === 'generating';
  const isComplete = status === 'complete';

  const currentStep = !crawlResult ? 1 : !isComplete ? 2 : 3;
  const completedSteps = [
    ...(crawlResult ? [1] : []),
    ...(isComplete ? [2, 3] : []),
  ];

  return (
    <div className="max-w-3xl mx-auto px-5 pt-8 pb-20">

      {/* ── Hero ── */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-subtle border border-white/8 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-[pulse-dot_2s_ease-in-out_infinite]" />
          <span className="text-[10px] text-neutral-500 tracking-widest uppercase font-medium">
            AI Proposal Generator
          </span>
        </div>

        <h1 className="text-[2.2rem] font-bold tracking-tight leading-[1.15] mb-3">
          <span className="text-white">URL 하나로</span>
          <br />
          <span className="text-shimmer">완성된 제안서를 받아보세요</span>
        </h1>

        <p className="text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
          웹사이트 내용을 분석하여 Claude Opus 4.6이
          <br />
          전문적인 비즈니스 제안서를 자동 작성합니다.
        </p>
      </div>

      {/* ── Step Indicator ── */}
      <div className="flex justify-center mb-8">
        <StepIndicator
          steps={STEPS}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      </div>

      {/* ── Step 1: URL 입력 ── */}
      <div className="space-y-3">
        <UrlInput
          onCrawlComplete={setCrawlResult}
          disabled={isGenerating || isComplete}
        />

        {/* ── Step 2: 프롬프트 설정 ── */}
        {crawlResult && !isComplete && (
          <PromptEditor
            value={customPrompt}
            onChange={setCustomPrompt}
            disabled={isGenerating}
          />
        )}

        {/* ── Step 3: 생성 버튼 ── */}
        {crawlResult && !isComplete && (
          <GlassCard variant="default" padding="md">
            {error && (
              <div className="mb-4 flex items-start gap-2 px-3.5 py-3 rounded-xl bg-red-500/8 border border-red-500/15">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-red-400 shrink-0 mt-0.5">
                  <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M6.5 4v3M6.5 9v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span className="text-xs text-red-400 leading-relaxed">{error}</span>
              </div>
            )}

            <GlassButton
              variant="primary"
              size="lg"
              onClick={generate}
              loading={isGenerating}
              disabled={isGenerating}
              className="w-full tracking-tight"
            >
              {isGenerating ? (
                <>AI가 제안서를 작성하는 중...</>
              ) : (
                <>
                  제안서 생성하기
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-1">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </GlassButton>

            {isGenerating && (
              <p className="text-center text-[11px] text-neutral-600 mt-3">
                평균 15~30초 소요됩니다
              </p>
            )}
          </GlassCard>
        )}

        {/* ── 결과 ── */}
        {isComplete && proposal && (
          <ProposalResult
            proposal={proposal}
            onSave={save}
            onReset={reset}
            isSaving={isSaving}
            isSaved={isSaved}
          />
        )}
      </div>

      {/* ── 하단 링크 ── */}
      <div className="flex justify-center mt-10">
        <Link href="/proposals">
          <GlassButton variant="ghost" size="sm">
            저장된 제안서 보기
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6h7M7 3.5L9.5 6 7 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </GlassButton>
        </Link>
      </div>
    </div>
  );
}
