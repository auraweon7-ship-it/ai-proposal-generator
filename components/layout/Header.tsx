'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 glass-frosted border-b border-white/[0.07]">
      <div className="max-w-4xl mx-auto px-6 py-3.5 flex items-center justify-between">

        {/* ── 로고 ── */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-xl glass-strong inner-shadow flex items-center justify-center transition-all duration-200 group-hover:scale-105">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-white/80">
              <path d="M1.5 3.5h12M1.5 7.5h8M1.5 11.5h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            {/* 상단 shimmer 라인 */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-xl" />
          </div>
          <div>
            <div className="text-[13px] font-semibold tracking-tight text-white/90 leading-none">
              AI 제안서 생성기
            </div>
            <div className="text-[10px] text-neutral-600 mt-0.5 tracking-wide">
              Powered by Claude Opus 4.6
            </div>
          </div>
        </Link>

        {/* ── 네비게이션 ── */}
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className={[
              'text-xs px-3 py-1.5 rounded-lg transition-all duration-200',
              pathname === '/'
                ? 'text-white bg-white/8 border border-white/10'
                : 'text-neutral-500 hover:text-white hover:bg-white/5',
            ].join(' ')}
          >
            생성
          </Link>
          <Link
            href="/proposals"
            className={[
              'text-xs px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5',
              pathname.startsWith('/proposals')
                ? 'text-white bg-white/8 border border-white/10'
                : 'text-neutral-500 hover:text-white hover:bg-white/5',
            ].join(' ')}
          >
            <span>저장된 제안서</span>
          </Link>
        </nav>
      </div>

      {/* 하단 그라디언트 라인 */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </header>
  );
}
