import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import GlassCard from '@/components/ui/GlassCard';
import FaviconImage from '@/components/ui/FaviconImage';
import { ProposalListItem } from '@/types';

export const revalidate = 0;

function EmptyState() {
  return (
    <GlassCard variant="inset" className="py-20 text-center">
      {/* 간단한 SVG 일러스트 */}
      <div className="flex justify-center mb-5">
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" className="opacity-20">
          <rect x="10" y="6" width="32" height="40" rx="4" stroke="white" strokeWidth="1.5"/>
          <path d="M18 16h16M18 22h12M18 28h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="38" cy="38" r="8" fill="#0a0a0a" stroke="white" strokeWidth="1.5"/>
          <path d="M35 38h6M38 35v6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <p className="text-sm text-neutral-500 mb-1">아직 저장된 제안서가 없습니다</p>
      <p className="text-xs text-neutral-700 mb-6">제안서를 생성하고 저장하면 여기에 표시됩니다</p>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-white glass-strong px-4 py-2 rounded-xl border border-white/12 hover:bg-white/10 transition-colors"
      >
        첫 번째 제안서 만들기
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M2.5 5.5h6M6 3l2.5 2.5L6 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </GlassCard>
  );
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘';
  if (diffDays === 1) return '어제';
  if (diffDays < 7) return `${diffDays}일 전`;
  return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
}

function getHostname(url: string) {
  try { return new URL(url).hostname; } catch { return url; }
}

export default async function ProposalsPage() {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('proposals')
    .select('id, title, source_url, source_name, model_used, created_at')
    .order('created_at', { ascending: false })
    .limit(50);

  const proposals: ProposalListItem[] = data || [];

  return (
    <div className="max-w-3xl mx-auto px-5 pt-8 pb-20">

      {/* 헤더 */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-2 font-medium">Archive</p>
          <h1 className="text-2xl font-bold tracking-tight text-white">저장된 제안서</h1>
          {proposals.length > 0 && (
            <p className="text-xs text-neutral-600 mt-1.5">총 {proposals.length}개</p>
          )}
        </div>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white glass-subtle px-3.5 py-2 rounded-xl border border-white/8 hover:border-white/15 transition-all duration-200"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M8.5 5.5h-6M5 3L2.5 5.5 5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          새 제안서 만들기
        </Link>
      </div>

      {/* 구분선 */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-6" />

      {error && (
        <GlassCard>
          <p className="text-red-400 text-sm">데이터를 불러오는 중 오류가 발생했습니다.</p>
        </GlassCard>
      )}

      {!error && proposals.length === 0 && <EmptyState />}

      {/* 그리드 레이아웃 */}
      {proposals.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {proposals.map((proposal) => (
            <Link key={proposal.id} href={`/proposals/${proposal.id}`}>
              <GlassCard hover padding="md" className="h-full hover-lift">
                {/* 카드 내부 */}
                <div className="flex flex-col h-full">
                  {/* 상단: 사이트 정보 */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-md bg-white/8 border border-white/10 overflow-hidden shrink-0">
                      <FaviconImage domain={getHostname(proposal.source_url)} />
                    </div>
                    <span className="text-[10px] text-neutral-600 truncate">
                      {getHostname(proposal.source_url)}
                    </span>
                    <span className="ml-auto text-[10px] text-neutral-700 shrink-0">
                      {formatDate(proposal.created_at)}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h2 className="text-sm font-semibold text-white leading-snug line-clamp-2 flex-1">
                    {proposal.title}
                  </h2>

                  {/* 하단 */}
                  <div className="mt-3 pt-3 border-t border-white/6 flex items-center justify-between">
                    <span className="text-[10px] text-neutral-700">Claude Opus</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-neutral-600">
                      <path d="M2.5 6h7M7 3.5L9.5 6 7 8.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
