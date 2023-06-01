import { FormEvent, useEffect, useState } from 'react';
import { newClientFormEditValues } from '../form-values/values';

export const useNCFEditForm = (callback: any, data: any) => {
  const [inputs, setInputs] = useState(newClientFormEditValues);

  useEffect(() => {
    if (data?.getNewClientFormById) {
      const {
        getNewClientFormById: { user, address, vet, openYard },
      } = data;

      setInputs((inputs) => ({
        ...inputs,
        firstName: user?.firstName,
        lastName: user?.lastName,
        emailAddress: user?.emailAddress,
        phoneNumber: user?.phoneNumber,
        address: {
          addressLine1: address?.addressLine1,
          city: address?.city,
          state: address?.state,
          zipPostalCode: address?.zipPostalCode,
        },
        vet: {
          name: vet?.name,
          phoneNumber: vet?.phoneNumber,
          address: vet?.address,
        },
        openYard,
      }));
    }
  }, [data]);

  const handleInputChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    let eventName = target.name;
    const eventValue = target.value;

    const value = eventValue === 'on' ? target.checked : eventValue;

    const isAddressField = [
      'addressLine1',
      'city',
      'state',
      'zipPostalCode',
    ].includes(eventName);

    const vetField = ['name', 'address', 'vetPhoneNumber'].includes(eventName);

    if (isAddressField) {
      setInputs((inputs) => ({
        ...inputs,
        address: {
          ...inputs?.address,
          [eventName]: eventValue,
        },
      }));
    } else if (vetField) {
      if (eventName === 'vetPhoneNumber') {
        eventName = 'phoneNumber';
      }
      setInputs((inputs) => ({
        ...inputs,
        vet: {
          ...inputs?.vet,
          [eventName]: eventValue,
        },
      }));
    } else {
      setInputs((inputs) => ({
        ...inputs,
        [eventName]: value,
      }));
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    callback();
  };

  return { inputs, handleInputChange, setInputs, onSubmit };
};
