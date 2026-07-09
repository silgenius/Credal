import { ReactNode } from 'react';

interface StepTransitionProps {
  stepKey: string | number;
  direction: 'forward' | 'back';
  children: ReactNode;
}

export default function StepTransition({ stepKey, direction, children }: StepTransitionProps) {
  return (
    <div key={stepKey} className={direction === 'forward' ? 'animate-step-forward' : 'animate-step-back'}>
      {children}
    </div>
  );
}