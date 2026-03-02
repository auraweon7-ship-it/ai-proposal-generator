'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';

interface ProposalResultProps {
  proposal: string;
  onSave: () => Promise<boolean>;
  onReset: () => void;
  isSaving: boolean;
  isSaved: boolean;
}

export default function ProposalResult({ proposal, onSave, onReset, isSaving, isSaved }: ProposalResultProps) {
  const [copied, setCopied] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(proposal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  async function handleSave() {
    const success = await onSave();
    if (success) {
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    }
  }

  return (
    <GlassCard variant="elevated" className="animate-[slide-up_0.45s_cubic-bezier(0.16,1,0.3,1)] relative">
      {/* 저장 토스트 */}
      {saveToast && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-xl glass-frosted border border-white/15 animate-[fade-in_0.2s_ease-out] no-print">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l2.5 2.5L10 3" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs text-white">제안서가 저장되었습니다</span>
        </div>
      )}

      {/* 헤더 */}
      <div className="flex items-center justify-between mb-5 no-print">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded-full bg-white/30" />
          <span className="text-sm font-semibold text-white">생성된 제안서</span>
          <span className="text-[10px] text-neutral-600 font-medium px-2 py-0.5 rounded-full border border-white/8">
            Claude Opus 4.6
          </span>
        </div>

        {/* 액션 버튼 그룹 */}
        <div className="flex items-center gap-1.5">
          <GlassButton size="sm" variant="ghost" onClick={handleCopy} className="gap-1.5">
            {copied ? (
              <>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M1.5 5.5l2.5 2.5 5.5-6" stroke="#4ade80" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-emerald-400">복사됨</span>
              </>
            ) : (
              <>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="text-neutral-500">
                  <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.3" stroke="currentColor" strokeWidth="1.1"/>
                  <path d="M2.5 7.5H1.5a1 1 0 01-1-1V1.5a1 1 0 011-1h5a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                </svg>
                복사
              </>
            )}
          </GlassButton>

          <div className="w-px h-3.5 bg-white/10" />

          <GlassButton
            size="sm"
            variant="secondary"
            onClick={handleSave}
            loading={isSaving}
            disabled={isSaved}
            className="gap-1.5"
          >
            {isSaved ? (
              <>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M1.5 5.5l2.5 2.5 5.5-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                저장됨
              </>
            ) : '저장'}
          </GlassButton>

          <GlassButton size="sm" variant="ghost" onClick={onReset}>
            다시 생성
          </GlassButton>
        </div>
      </div>

      {/* 구분선 */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-5 no-print" />

      {/* 제안서 본문 */}
      <div className="relative">
        {/* 좌측 accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />
        <div className="pl-5 prose prose-sm max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {proposal}
          </ReactMarkdown>
        </div>
      </div>
    </GlassCard>
  );
}
