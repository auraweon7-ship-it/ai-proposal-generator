import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createServerClient } from '@/lib/supabase/server';
import GlassCard from '@/components/ui/GlassCard';
import ProposalContent from './ProposalContent';

interface Props {
  params: Promise<{ id: string }>;
}

function getHostname(url: string) {
  try { return new URL(url).hostname; } catch { return url; }
}

export default async function ProposalDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    notFound();
  }

  const hostname = getHostname(data.source_url);
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;

  return (
    <div className="max-w-3xl mx-auto px-5 pt-8 pb-20">

      {/* 브레드크럼 */}
      <nav className="flex items-center gap-2 mb-6 text-xs no-print">
        <Link href="/" className="text-neutral-600 hover:text-neutral-400 transition-colors">
          홈
        </Link>
        <span className="text-neutral-700">/</span>
        <Link href="/proposals" className="text-neutral-600 hover:text-neutral-400 transition-colors">
          제안서 목록
        </Link>
        <span className="text-neutral-700">/</span>
        <span className="text-neutral-500 truncate max-w-[200px]">{data.title}</span>
      </nav>

      {/* 메타 정보 카드 */}
      <GlassCard variant="highlight" className="mb-4 no-print">
        <div className="flex items-start gap-4">
          {/* 파비콘 */}
          <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={faviconUrl}
              alt=""
              className="w-5 h-5"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = 'none';
                el.parentElement!.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/><path d="M5 8h6M8 5v6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round"/></svg>`;
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-bold text-white leading-snug mb-2">{data.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-neutral-500">
              <a
                href={data.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-neutral-300 transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M4 2H2a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1V6M6 1h3m0 0v3m0-3L4.5 5.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {data.source_name || hostname}
              </a>
              <span className="text-neutral-700">·</span>
              <span>
                {new Date(data.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="text-neutral-700">·</span>
              <span className="text-neutral-600">Claude Opus 4.6</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* 제안서 본문 */}
      <ProposalContent content={data.content} />
    </div>
  );
}
