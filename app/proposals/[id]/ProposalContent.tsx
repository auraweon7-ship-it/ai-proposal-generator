'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';

interface ProposalContentProps {
  content: string;
}

export default function ProposalContent({ content }: ProposalContentProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <GlassCard variant="elevated">
      {/* 툴바 */}
      <div className="flex items-center justify-between mb-5 no-print">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-5 rounded-full bg-white/25" />
          <span className="text-sm font-semibold text-white">제안서 내용</span>
        </div>
        <div className="flex items-center gap-1.5">
          <GlassButton size="sm" variant="ghost" onClick={handleCopy} className="gap-1.5">
            {copied ? (
              <span className="text-emerald-400">복사됨 ✓</span>
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
          <GlassButton size="sm" variant="ghost" onClick={handlePrint} className="gap-1.5">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="text-neutral-500">
              <path d="M3 3V1.5h5V3M2 3h7a1 1 0 011 1v4H1V4a1 1 0 011-1zM3 8v1.5h5V8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            인쇄
          </GlassButton>
        </div>
      </div>

      {/* 구분선 */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-5 no-print" />

      {/* 본문 */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/12 to-transparent no-print" />
        <div className="pl-5 prose prose-sm max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </GlassCard>
  );
}
