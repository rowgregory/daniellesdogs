import { useEffect, useState } from 'react';
import { productValues } from '../form-values/values';

export const useProductForm = (callback: any, data: any) => {
  const [inputs, setInputs] = useState(productValues);

  console.log('data: ', data);

  useEffect(() => {
    if (data?.productById) {
      const {
        productById: { name, image, price, description, countInStock, sizes },
      } = data;
      setInputs((inputs: any) => ({
        ...inputs,
        name,
        image,
        price,
        description,
        countInStock,
        sizes,
      }));
    }
  }, [data]);

  const handleInputChange = (e: any) => {
    const eventName = e.target.name,
      eventValue = e.target.value;

    setInputs((inputs: any) => ({
      ...inputs,
      [eventName]: eventValue,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return { inputs, handleInputChange, setInputs, onSubmit };
};
