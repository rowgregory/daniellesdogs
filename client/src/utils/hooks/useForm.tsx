import { useState, useEffect } from 'react';

export const useForm = (callback?: any, values?: any, data?: any) => {
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data?.bioById) {
      const {
        bioById: {
          firstName,
          lastName,
          emailAddress,
          title,
          description,
          image,
        },
      } = data;

      setInputs((inputs: any) => ({
        ...inputs,
        firstName,
        lastName,
        emailAddress,
        title,
        description,
        image,
      }));
    }
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
