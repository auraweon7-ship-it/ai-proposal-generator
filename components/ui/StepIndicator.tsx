'use client';

interface Step {
  id: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

export default function StepIndicator({ steps, currentStep, completedSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, idx) => {
        const isCompleted = completedSteps.includes(step.id);
        const isActive = step.id === currentStep;
        const isLast = idx === steps.length - 1;

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex items-center gap-2">
              {/* 원형 번호/체크 */}
              <div
                className={[
                  'w-6 h-6 rounded-full flex items-center justify-center shrink-0',
                  'text-[10px] font-bold transition-all duration-300',
                  isCompleted
                    ? 'bg-white text-black'
                    : isActive
                    ? 'bg-white/15 border border-white/35 text-white'
                    : 'bg-white/5 border border-white/10 text-neutral-600',
                ].join(' ')}
              >
                {isCompleted ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  step.id
                )}
              </div>
              {/* 라벨 */}
              <span
                className={[
                  'text-xs transition-colors duration-200',
                  isCompleted ? 'text-neutral-400' : isActive ? 'text-white font-medium' : 'text-neutral-600',
                ].join(' ')}
              >
                {step.label}
              </span>
            </div>
            {/* 연결선 */}
            {!isLast && (
              <div className="flex items-center mx-3">
                <div
                  className={[
                    'w-8 h-px transition-colors duration-300',
                    isCompleted ? 'bg-white/25' : 'bg-white/8',
                  ].join(' ')}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
