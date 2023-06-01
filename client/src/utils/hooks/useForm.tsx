import { useState, useEffect } from 'react';

export const useForm = (callback?: any, values?: any, data?: any) => {
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    let object: any;
    if (data?.bioById) {
      object = data?.bioById;
    } else if (data?.serviceById) {
      object = data.serviceById;
      console.log(object);
    }

    setInputs((inputs: any) => ({
      ...inputs,
      ...object,
    }));
  }, [data]);

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
