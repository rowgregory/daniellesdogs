import { useState, useEffect } from 'react';

export const useForm = (callback, values, data) => {
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data?.getNewClientFormById) {
      const {
        getNewClientFormById: { user, address, vet },
      } = data;

      setInputs((inputs) => ({
        ...inputs,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        phoneNumber: user.phoneNumber,
        address: {
          addressLine1: address.addressLine1,
          city: address.city,
          state: address.state,
          zipPostalCode: address.zipPostalCode,
        },
        vet: {
          name: vet.name,
          phoneNumber: vet.phoneNumber,
          address: vet.address,
        },
      }));
    } else if (data?.bioById) {
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

      setInputs((inputs) => ({
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

  const handleInputChange = (e, i) => {
    const eventName = e.target.name,
      eventValue = e.target.value,
      eventChecked = e.target.checked;

    const value = eventValue === 'on' ? eventChecked : eventValue;

    const isAddressField = [
      'addressLine1',
      'city',
      'state',
      'zipPostalCode',
    ].includes(eventName);

    const vetField = ['vetName', 'vetAddress', 'vetPhoneNumber'].includes(
      eventName
    );

    const isPetField = [
      `name`,
      `age`,
      `breedString`,
      `sex`,
      `preferredTimeOfService`,
      `harnessLocation`,
      `dropOffLocation`,
      `freeRoaming`,
      `isSprayed`,
      `medications`,
      `allergies`,
      `temperament`,
      `goodWithStrangers`,
    ].includes(eventName);

    if (isAddressField) {
      setInputs((inputs) => ({
        ...inputs,
        address: {
          ...inputs?.address,
          [eventName]: eventValue,
        },
      }));
    } else if (isPetField) {
      const values = [...inputs.pets];
      values[i][eventName] = value;

      setInputs(() => ({
        ...inputs,
        pets: values,
      }));
    } else if (vetField) {
      let evName;
      if (eventName === 'vetName') {
        evName = 'name';
      } else if (eventName === 'vetPhoneNumber') {
        evName = 'phoneNumber';
      } else {
        evName = 'address';
      }
      setInputs((inputs) => ({
        ...inputs,
        vet: {
          ...inputs?.vet,
          [evName]: eventValue,
        },
      }));
    } else {
      setInputs((inputs) => ({
        ...inputs,
        [eventName]: value,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return { inputs, handleInputChange, setInputs, onSubmit };
};
