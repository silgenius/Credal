'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthCard from '@/components/auth/AuthCard';
import StepProgress from '@/components/auth/StepProgress';
import StepTransition from '@/components/auth/StepTransition';
import WelcomeStep from '@/components/auth/WelcomeStep';
import PhoneStep from '@/components/auth/PhoneStep';
import OtpStep from '@/components/auth/OtpStep';
import PersonalInfoStep from '@/components/auth/PersonalInfoStep';
import IdentityStep from '@/components/auth/IdentityStep';
import SuccessStep from '@/components/auth/SuccessStep';
import { EMPTY_SIGNUP_DATA, type SignupData } from '@/components/auth/types';

type Screen = 'welcome' | 'phone' | 'otp' | 'personal' | 'identity' | 'success';

const PROGRESS_STEP: Partial<Record<Screen, number>> = {
  phone: 1,
  otp: 2,
  personal: 3,
  identity: 4,
};
const TOTAL_PROGRESS_STEPS = 4;

export default function SignupPage() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>('welcome');
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [data, setData] = useState<SignupData>(EMPTY_SIGNUP_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const goTo = (next: Screen, dir: 'forward' | 'back' = 'forward') => {
    setDirection(dir);
    setScreen(next);
  };

  const progressStep = PROGRESS_STEP[screen];

  return (
    <AuthCard>
      {progressStep !== undefined && (
        <StepProgress currentStep={progressStep} totalSteps={TOTAL_PROGRESS_STEPS} />
      )}

      {screen === 'welcome' && (
        <StepTransition stepKey="welcome" direction={direction}>
          <WelcomeStep onBegin={() => goTo('phone')} />
        </StepTransition>
      )}

      {screen === 'phone' && (
        <StepTransition stepKey="phone" direction={direction}>
          <PhoneStep
            value={data.phone}
            onNext={(phone) => {
              setData((prev) => ({ ...prev, phone }));
              goTo('otp');
            }}
            onBack={() => goTo('welcome', 'back')}
          />
        </StepTransition>
      )}

      {screen === 'otp' && (
        <StepTransition stepKey="otp" direction={direction}>
          <OtpStep
            phone={data.phone}
            onVerified={() => goTo('personal')}
            onBack={() => goTo('phone', 'back')}
          />
        </StepTransition>
      )}

      {screen === 'personal' && (
        <StepTransition stepKey="personal" direction={direction}>
          <PersonalInfoStep
            defaultValues={data}
            onNext={(values) => {
              setData((prev) => ({ ...prev, ...values }));
              goTo('identity');
            }}
            onBack={() => goTo('otp', 'back')}
          />
        </StepTransition>
      )}

      {screen === 'identity' && (
        <StepTransition stepKey="identity" direction={direction}>
          <IdentityStep
            defaultValues={data}
            isSubmitting={isSubmitting}
            onNext={(values) => {
              setData((prev) => ({ ...prev, ...values }));
              setIsSubmitting(true);
              // Simulated account-creation request.
              setTimeout(() => {
                setIsSubmitting(false);
                goTo('success');
              }, 900);
            }}
            onSkip={() => goTo('success')}
            onBack={() => goTo('personal', 'back')}
          />
        </StepTransition>
      )}

      {screen === 'success' && (
        <StepTransition stepKey="success" direction="forward">
          <SuccessStep onComplete={() => router.push('/home')} />
        </StepTransition>
      )}
    </AuthCard>
  );
}