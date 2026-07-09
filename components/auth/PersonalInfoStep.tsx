'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import TextField from '../ui/TextField';
import SelectField from '../ui/SelectField';
import Button from '../ui/Button';
import BackButton from '../ui/BackButton';
import { NIGERIAN_STATES } from './nigerian-states';
import type { SignupData } from './types';

type PersonalFields = Pick<SignupData, 'firstName' | 'lastName' | 'dob' | 'gender' | 'state'>;

interface PersonalInfoStepProps {
  defaultValues: PersonalFields;
  onNext: (values: PersonalFields) => void;
  onBack: () => void;
}

type Errors = Partial<Record<keyof PersonalFields, string>>;

const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Prefer not to say', value: 'undisclosed' },
];

const STATE_OPTIONS = NIGERIAN_STATES.map((state) => ({ label: state, value: state }));

const TODAY = new Date().toISOString().split('T')[0];

export default function PersonalInfoStep({ defaultValues, onNext, onBack }: PersonalInfoStepProps) {
  const [values, setValues] = useState<PersonalFields>(defaultValues);
  const [errors, setErrors] = useState<Errors>({});

  const update =
    (field: keyof PersonalFields) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const validate = (): boolean => {
    const nextErrors: Errors = {};
    if (!values.firstName.trim()) nextErrors.firstName = 'First name is required';
    if (!values.lastName.trim()) nextErrors.lastName = 'Last name is required';
    if (!values.dob) nextErrors.dob = 'Date of birth is required';
    if (!values.gender) nextErrors.gender = 'Please select an option';
    if (!values.state) nextErrors.state = 'State of residence is required';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (validate()) onNext(values);
  };

  return (
    <div>
      <BackButton onClick={onBack} />
      <h2 className="text-2xl font-semibold text-ink">Tell us about yourself</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        This helps us verify your identity and personalize your Credal experience.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5" noValidate>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <TextField
            label="First name"
            name="firstName"
            placeholder="Amina"
            value={values.firstName}
            onChange={update('firstName')}
            error={errors.firstName}
            autoComplete="given-name"
            autoFocus
          />
          <TextField
            label="Last name"
            name="lastName"
            placeholder="Okafor"
            value={values.lastName}
            onChange={update('lastName')}
            error={errors.lastName}
            autoComplete="family-name"
          />
        </div>

        <TextField
          label="Date of birth"
          name="dob"
          type="date"
          value={values.dob}
          onChange={update('dob')}
          error={errors.dob}
          max={TODAY}
        />

        <SelectField
          label="Gender"
          name="gender"
          value={values.gender}
          onChange={update('gender')}
          error={errors.gender}
          options={GENDER_OPTIONS}
          placeholder="Select gender"
        />

        <SelectField
          label="State of residence"
          name="state"
          value={values.state}
          onChange={update('state')}
          error={errors.state}
          options={STATE_OPTIONS}
          placeholder="Select your state"
        />

        <Button type="submit" fullWidth className="mt-2">
          Continue
        </Button>
      </form>
    </div>
  );
}