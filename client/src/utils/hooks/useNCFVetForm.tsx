import { FormEvent, useState } from 'react';
import { ncfVetValues } from '../form-values/values';

export const useNCFVetForm = (callback: any) => {
  const [inputs, setInputs] = useState(ncfVetValues);

  const handleInputChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    setInputs((inputs) => ({
      ...inputs,
      vet: {
        ...inputs?.vet,
        [target.name]: target.value,
      },
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return { inputs, handleInputChange, setInputs, onSubmit };
};
