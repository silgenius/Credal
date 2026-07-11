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
import PinStep from '@/components/auth/PinStep';
import SuccessStep from '@/components/auth/SuccessStep';
import { EMPTY_SIGNUP_DATA, type SignupData } from '@/components/auth/types';
import { useAppDispatch } from '@/store/hooks';
import { signupSuccess } from '@/store/slices/authSlice';
import { setProfile } from '@/store/slices/profileSlice';

type Screen = 'welcome' | 'phone' | 'otp' | 'personal' | 'identity' | 'pin' | 'success';

const PROGRESS_STEP: Partial<Record<Screen, number>> = {
  phone: 1,
  otp: 2,
  personal: 3,
  identity: 4,
  pin: 5,
};
const TOTAL_PROGRESS_STEPS = 5;

function makeCredalId() {
  const block = () => Math.random().toString(36).slice(2, 6).toUpperCase();
  return `CR-${block()}-${block()}`;
}

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
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
            isSubmitting={false}
            onNext={(values) => {
              setData((prev) => ({ ...prev, ...values }));
              goTo('pin');
            }}
            onSkip={() => goTo('pin')}
            onBack={() => goTo('personal', 'back')}
          />
        </StepTransition>
      )}

      {screen === 'pin' && (
        <StepTransition stepKey="pin" direction={direction}>
          <PinStep
            isSubmitting={isSubmitting}
            onNext={(pin) => {
              setData((prev) => ({ ...prev, pin }));
              setIsSubmitting(true);
              // Simulated account-creation request.
              setTimeout(() => {
                const credalId = makeCredalId();

                dispatch(signupSuccess({ phone: data.phone, pin, credalId }));
                dispatch(
                  setProfile({
                    fullName: `${data.firstName} ${data.lastName}`.trim(),
                    credalId,
                    phone: data.phone,
                    email: '',
                    businessName: '',
                    memberSince: new Intl.DateTimeFormat('en-NG', {
                      month: 'long',
                      year: 'numeric',
                    }).format(new Date()),
                    trustScore: 0,
                    verified: Boolean(data.bvn || data.nin),
                  }),
                );

                setIsSubmitting(false);
                goTo('success');
              }, 900);
            }}
            onBack={() => goTo('identity', 'back')}
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