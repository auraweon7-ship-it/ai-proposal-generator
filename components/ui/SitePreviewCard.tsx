'use client';

interface SitePreviewCardProps {
  title: string;
  url: string;
  onReset?: () => void;
}

export default function SitePreviewCard({ title, url, onReset }: SitePreviewCardProps) {
  let hostname = '';
  try {
    hostname = new URL(url).hostname;
  } catch {
    hostname = url;
  }

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;

  return (
    <div className="mt-4 flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8 animate-[fade-in_0.3s_ease-out]">
      <div className="flex items-center gap-3 min-w-0">
        {/* Favicon */}
        <div className="w-7 h-7 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={faviconUrl}
            alt=""
            className="w-4 h-4"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-white font-medium truncate">{title}</p>
          <p className="text-[11px] text-neutral-500 truncate">{hostname}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="3" fill="currentColor"/>
          </svg>
          분석 완료
        </span>
        {onReset && (
          <button
            onClick={onReset}
            className="text-[10px] text-neutral-600 hover:text-neutral-400 transition-colors px-2 py-0.5 rounded hover:bg-white/5"
          >
            변경
          </button>
        )}
      </div>
    </div>
  );
}
