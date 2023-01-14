import { FormEvent, useState } from 'react';
import { ncfPetsValues } from '../form-values/values';

export const useNCFPetsForm = (callback: any) => {
  const [inputs, setInputs] = useState(ncfPetsValues);

  const handleInputChange = (e: FormEvent<EventTarget>, i?: any) => {
    const target = e.target as HTMLInputElement;

    const value = target.value === 'on' ? target.checked : target.value;

    let values: any;
    if (target.name !== 'openYard') {
      values = [...inputs.pets];
      values[i][target.name] = value;
      setInputs(() => ({
        ...inputs,
        pets: values,
      }));
    } else {
      setInputs(() => ({
        ...inputs,
        openYard: value,
      }));
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return { inputs, handleInputChange, setInputs, onSubmit };
};
