'use client';

import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { DEFAULT_PROPOSAL_PROMPT } from '@/lib/prompt';

interface PromptEditorProps {
  value: string;
  onChange: (prompt: string) => void;
  disabled?: boolean;
}

const VARIABLES = ['{SITE_URL}', '{SITE_TITLE}', '{CRAWLED_CONTENT}'];

export default function PromptEditor({ value, onChange, disabled }: PromptEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isModified = value !== DEFAULT_PROPOSAL_PROMPT;

  return (
    <GlassCard variant="default">
      {/* 아코디언 헤더 */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        disabled={disabled}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between group disabled:opacity-40 focus:outline-none"
      >
        <div className="flex items-center gap-3">
          {/* 아이콘 */}
          <div className="w-7 h-7 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-neutral-400">
              <path d="M2 3h9M2 6.5h6M2 10h7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M10 8l1.5 1.5L10 11" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">프롬프트 설정</span>
              {isModified && (
                <span className="inline-flex items-center gap-1 text-[9px] font-medium bg-white/10 text-neutral-300 px-1.5 py-0.5 rounded-full border border-white/10">
                  <span className="w-1 h-1 rounded-full bg-white/60 inline-block" />
                  수정됨
                </span>
              )}
            </div>
            <p className="text-[11px] text-neutral-600 mt-0.5">
              {isOpen ? 'AI 지시 프롬프트 편집 중' : '클릭하여 AI 프롬프트 커스터마이즈'}
            </p>
          </div>
        </div>

        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          className={`text-neutral-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* 펼침 영역 */}
      {isOpen && (
        <div className="mt-5 animate-[slide-up_0.25s_cubic-bezier(0.16,1,0.3,1)]">
          {/* 변수 칩 + 리셋 */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex flex-wrap gap-1.5">
              {VARIABLES.map((v) => (
                <span
                  key={v}
                  className="text-[10px] font-mono bg-white/6 border border-white/10 text-neutral-400 px-2 py-0.5 rounded-md"
                >
                  {v}
                </span>
              ))}
              <span className="text-[10px] text-neutral-600 self-center ml-1">자동 치환</span>
            </div>
            {isModified && (
              <GlassButton size="sm" variant="ghost" onClick={() => onChange(DEFAULT_PROPOSAL_PROMPT)} disabled={disabled}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M9 5.5A3.5 3.5 0 112 2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M2 1v2h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                초기화
              </GlassButton>
            )}
          </div>

          {/* 텍스트에어리어 */}
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            rows={11}
            spellCheck={false}
            className={[
              'w-full px-4 py-3.5 rounded-xl resize-y',
              'bg-black/20 border border-white/8',
              'text-neutral-300 text-[12px] font-mono leading-relaxed',
              'focus:outline-none focus:border-white/18 focus:bg-black/25',
              'transition-all duration-200',
              'disabled:opacity-40',
            ].join(' ')}
          />
        </div>
      )}
    </GlassCard>
  );
}
