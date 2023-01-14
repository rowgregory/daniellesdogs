import { FormEvent, useState } from 'react';
import { ncfAddressValues } from '../form-values/values';

export const useNCFAddressForm = (callback: any) => {
  const [inputs, setInputs] = useState(ncfAddressValues);

  const handleInputChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;

    setInputs((inputs) => ({
      ...inputs,
      address: {
        ...inputs?.address,
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
