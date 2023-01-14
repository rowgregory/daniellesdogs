import { FormEvent, useState } from 'react';
import { ncfWaiverValues } from '../form-values/values';

export const useNCFWaiverForm = (callback: any) => {
  const [inputs, setInputs] = useState(ncfWaiverValues);

  const handleInputChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;

    setInputs((inputs: any) => ({
      ...inputs,
      [target.name]: target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return { inputs, handleInputChange, setInputs, onSubmit };
};
