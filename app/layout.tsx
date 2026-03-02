import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import BackgroundOrbs from '@/components/layout/BackgroundOrbs';

export const metadata: Metadata = {
  title: 'AI 제안서 생성기',
  description: 'URL을 입력하면 AI가 자동으로 비즈니스 제안서를 생성합니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen bg-[#0a0a0a] text-white">
        <BackgroundOrbs />
        <div className="relative z-10">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
