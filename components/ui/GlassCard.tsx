'use client';

import { HTMLAttributes, forwardRef } from 'react';

type CardVariant = 'default' | 'elevated' | 'highlight' | 'inset';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: CardVariant;
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const variantMap: Record<CardVariant, string> = {
  default: 'glass',
  elevated: 'glass-strong glow-white',
  highlight: 'glass',
  inset: 'glass-subtle',
};

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', hover = false, padding = 'md', variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[
          'relative rounded-2xl overflow-hidden',
          variantMap[variant],
          paddingMap[padding],
          hover ? 'glass-hover hover-lift cursor-pointer' : '',
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      >
        {/* highlight variant: 상단 shimmer 라인 */}
        {variant === 'highlight' && (
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        )}
        {/* 내부 상단 광택 */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" />
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
