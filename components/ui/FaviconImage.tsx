'use client';

interface FaviconImageProps {
  domain: string;
}

export default function FaviconImage({ domain }: FaviconImageProps) {
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=20`}
      alt=""
      className="w-full h-full object-contain"
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
    />
  );
}
