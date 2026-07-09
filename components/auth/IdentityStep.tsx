'use client';

import { ChangeEvent, useState } from 'react';
import TextField from '../ui/TextField';
import Button from '../ui/Button';
import Tooltip from '../ui/Tooltip';
import BackButton from '../ui/BackButton';
import type { SignupData } from './types';

type IdentityFields = Pick<SignupData, 'bvn' | 'nin'>;

interface IdentityStepProps {
  defaultValues: IdentityFields;
  onNext: (values: IdentityFields) => void;
  onSkip: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

type Errors = Partial<Record<keyof IdentityFields, string>>;

export default function IdentityStep({
  defaultValues,
  onNext,
  onSkip,
  onBack,
  isSubmitting,
}: IdentityStepProps) {
  const [values, setValues] = useState<IdentityFields>(defaultValues);
  const [errors, setErrors] = useState<Errors>({});

  const update = (field: keyof IdentityFields) => (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 11);
    setValues((prev) => ({ ...prev, [field]: digits }));
  };

  const validate = (): boolean => {
    const nextErrors: Errors = {};
    if (values.bvn && values.bvn.length !== 11) nextErrors.bvn = 'BVN must be 11 digits';
    if (values.nin && values.nin.length !== 11) nextErrors.nin = 'NIN must be 11 digits';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleAddAndContinue = () => {
    if (validate()) onNext(values);
  };

  return (
    <div>
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-semibold text-ink">
        Do you have any of these? <span className="text-ink-muted">(Optional)</span>
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        Adding these strengthens your Credal Score. Skip if you don&apos;t have them — your
        community record is what matters most.
      </p>

      <div className="mt-6 flex flex-col gap-5">
        <div>
          <div className="mb-1.5 flex items-center gap-1.5">
            <label htmlFor="bvn" className="text-sm font-medium text-ink">
              BVN
            </label>
            <Tooltip text="Your Bank Verification Number — 11 digits" />
          </div>
          <TextField
            id="bvn"
            name="bvn"
            inputMode="numeric"
            placeholder="12345678901"
            value={values.bvn}
            onChange={update('bvn')}
            error={errors.bvn}
          />
        </div>

        <TextField
          label="NIN"
          name="nin"
          inputMode="numeric"
          placeholder="12345678901"
          value={values.nin}
          onChange={update('nin')}
          error={errors.nin}
          hint="Your National Identification Number — 11 digits"
        />

        <div className="mt-2 flex flex-col gap-3">
          <Button onClick={handleAddAndContinue} isLoading={isSubmitting} fullWidth>
            Add and Continue
          </Button>
          <Button variant="ghost" onClick={onSkip} fullWidth disabled={isSubmitting}>
            Skip for Now
          </Button>
        </div>
      </div>
    </div>
  );
}