'use client';

import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import SitePreviewCard from '@/components/ui/SitePreviewCard';
import { CrawlResult } from '@/types';

interface UrlInputProps {
  onCrawlComplete: (result: CrawlResult) => void;
  disabled?: boolean;
}

const LinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5.5 8.5l3-3M8 4.5l1.5-1.5a2.12 2.12 0 013 3L11 7.5M6 9.5l-1.5 1.5a2.12 2.12 0 01-3-3L3 6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

export default function UrlInput({ onCrawlComplete, disabled }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'crawling' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const [crawlData, setCrawlData] = useState<{ title: string; url: string } | null>(null);

  async function handleCrawl() {
    const trimmed = url.trim();
    if (!trimmed) return;

    setStatus('crawling');
    setError('');
    setCrawlData(null);

    try {
      const res = await fetch('/api/crawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '크롤링에 실패했습니다.');
      }

      setCrawlData({ title: data.title, url: data.url });
      setStatus('done');
      onCrawlComplete(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '오류가 발생했습니다.';
      setError(message);
      setStatus('error');
    }
  }

  function handleReset() {
    setStatus('idle');
    setError('');
    setCrawlData(null);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !disabled && status !== 'crawling') {
      handleCrawl();
    }
  }

  return (
    <GlassCard variant="highlight">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-7 h-7 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
          <LinkIcon />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white leading-none">웹사이트 분석</h2>
          <p className="text-[11px] text-neutral-600 mt-0.5">URL을 입력하면 AI가 페이지 내용을 읽어 제안서를 작성합니다</p>
        </div>
      </div>

      {/* 입력 영역 */}
      <div className="relative flex items-center gap-2">
        {/* URL prefix icon */}
        <div className="absolute left-3.5 text-neutral-600 pointer-events-none">
          <LinkIcon />
        </div>
        <input
          type="url"
          placeholder="https://company.com"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (status === 'error') { setStatus('idle'); setError(''); }
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled || status === 'crawling' || status === 'done'}
          className={[
            'flex-1 pl-10 pr-4 py-3.5 rounded-xl text-[13px]',
            'bg-white/5 border transition-all duration-200',
            'text-neutral-100 placeholder:text-neutral-600',
            'focus:outline-none focus:bg-white/7',
            'disabled:opacity-50',
            status === 'error'
              ? 'border-red-500/35 bg-red-500/5 focus:border-red-500/50'
              : 'border-white/10 focus:border-white/20',
          ].join(' ')}
        />
        {status !== 'done' && (
          <GlassButton
            onClick={handleCrawl}
            disabled={!url.trim() || disabled || status === 'crawling'}
            loading={status === 'crawling'}
            variant="secondary"
            size="md"
            className="shrink-0"
          >
            {status === 'crawling' ? '분석 중' : '분석하기'}
          </GlassButton>
        )}
      </div>

      {/* 에러 */}
      {status === 'error' && error && (
        <div className="mt-3 flex items-start gap-2 px-3 py-2.5 rounded-lg bg-red-500/8 border border-red-500/15 animate-[fade-in_0.2s_ease-out]">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-red-400 shrink-0 mt-0.5">
            <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M6.5 4v3.5M6.5 9v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span className="text-xs text-red-400 leading-relaxed">{error}</span>
        </div>
      )}

      {/* 성공: 사이트 미리보기 카드 */}
      {status === 'done' && crawlData && (
        <SitePreviewCard
          title={crawlData.title}
          url={crawlData.url}
          onReset={disabled ? undefined : handleReset}
        />
      )}
    </GlassCard>
  );
}
