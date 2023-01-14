import { useEffect, useState } from 'react';

export const usePetEditModalForm = (callback: any, values: any, data: any) => {
  const [inputs, setInputs] = useState(values);

  useEffect(() => {
    if (data) {
      const { getPetById } = data;
      setInputs((inputs: any) => ({
        ...inputs,
        name: getPetById?.name,
        age: getPetById?.age,
        breedString: getPetById?.breedString,
        sex: getPetById?.sex,
        preferredTimeOfService: getPetById?.preferredTimeOfService,
        harnessLocation: getPetById?.harnessLocation,
        dropOffLocation: getPetById?.dropOffLocation,
        freeRoaming: getPetById?.freeRoaming,
        isSprayed: getPetById?.isSprayed,
        medications: getPetById?.medications,
        allergies: getPetById?.allergies,
        temperament: getPetById?.temperament,
        goodWithStrangers: getPetById?.goodWithStrangers,
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
