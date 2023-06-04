import { FormEvent, useState } from 'react';
import { ncfWaiverValues } from '../form-values/values';

export const useNCFWaiverForm = (callback: any, setErrors: any) => {
  const [inputs, setInputs] = useState(ncfWaiverValues);

  const handleInputChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;

    if (target.checked)
      setErrors((errors: any) => ({ ...errors, signedWaiver: '' }));

    setInputs((inputs: any) => ({
      ...inputs,
      [target.name]: target.checked,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return { inputs, handleInputChange, setInputs, onSubmit };
};
