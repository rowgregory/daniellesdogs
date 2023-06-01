import { useEffect, useState } from 'react';
import { productValues } from '../form-values/values';

export const useProductForm = (callback: any, data: any) => {
  const [inputs, setInputs] = useState(productValues);

  useEffect(() => {
    if (data?.productById) {
      const product = data?.productById;

      setInputs((inputs: any) => ({
        ...inputs,
        name: product?.name,
        displayUrl: product?.displayUrl,
        price: product?.price,
        description: product?.description,
        countInStock: product?.countInStock,
        sizes: product?.sizes,
        category: product?.category,
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
