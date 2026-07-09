interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className="mb-6 flex items-center gap-2" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <span
          key={index}
          className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
            index < currentStep ? 'bg-brand-600' : 'bg-brand-100'
          }`}
        />
      ))}
    </div>
  );
}