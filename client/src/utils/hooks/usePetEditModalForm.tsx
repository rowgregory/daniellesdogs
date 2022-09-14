import { useState } from 'react';

export const usePetEditModalForm = (callback: any, values: any) => {
  const [inputs, setInputs] = useState(values);

  const handleInputChange = (e: any) => {
    const eventName = e.target.name,
      eventValue = e.target.value,
      eventChecked = e.target.checked;

    const value = eventValue === 'on' ? eventChecked : eventValue;

    setInputs((inputs: any) => ({
      ...inputs,
      [eventName]: value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return { inputs, handleInputChange, setInputs, onSubmit };
};
