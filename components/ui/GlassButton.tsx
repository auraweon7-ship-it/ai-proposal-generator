'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const variantMap = {
  primary: [
    'relative overflow-hidden',
    'bg-white text-[#0a0a0a] font-semibold',
    'border border-white/80',
    'hover:bg-white/90 active:scale-[0.98]',
    'shadow-[0_0_20px_rgba(255,255,255,0.15)]',
  ].join(' '),
  secondary: [
    'bg-white/8 text-white',
    'border border-white/12',
    'hover:bg-white/13 hover:border-white/18 active:scale-[0.98]',
  ].join(' '),
  ghost: [
    'bg-transparent text-neutral-500',
    'border border-transparent',
    'hover:text-white hover:bg-white/5 active:scale-[0.98]',
  ].join(' '),
};

const sizeMap = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3.5 text-sm rounded-xl',
};

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ children, variant = 'secondary', size = 'md', loading = false, disabled, className = '', ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center gap-2',
          'transition-all duration-200',
          'disabled:opacity-35 disabled:cursor-not-allowed disabled:pointer-events-none',
          variantMap[variant],
          sizeMap[size],
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      >
        {/* primary 버튼 shimmer */}
        {variant === 'primary' && !isDisabled && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
        )}
        {loading && (
          <svg className="animate-spin h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

export default GlassButton;
