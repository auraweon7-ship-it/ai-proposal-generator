'use client';

import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

interface GlassInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  error?: string;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ label, error, prefixIcon, suffixIcon, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-xs text-neutral-500 font-medium tracking-wide uppercase">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefixIcon && (
            <div className="absolute left-3.5 text-neutral-500 pointer-events-none flex items-center">
              {prefixIcon}
            </div>
          )}
          <input
            ref={ref}
            className={[
              'w-full py-3.5 rounded-xl',
              'bg-white/5 border',
              prefixIcon ? 'pl-10' : 'pl-4',
              suffixIcon ? 'pr-14' : 'pr-4',
              error
                ? 'border-red-500/40 bg-red-500/5 focus:border-red-500/60'
                : 'border-white/10 focus:border-white/22 focus:bg-white/7',
              'text-[13px] text-neutral-100 placeholder:text-neutral-600',
              'focus:outline-none transition-all duration-200',
              className,
            ].filter(Boolean).join(' ')}
            {...props}
          />
          {suffixIcon && (
            <div className="absolute right-2 flex items-center">
              {suffixIcon}
            </div>
          )}
        </div>
        {error && (
          <div className="flex items-center gap-1.5 text-xs text-red-400">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6 4v3M6 8.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {error}
          </div>
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';

export default GlassInput;
