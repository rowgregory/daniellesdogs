export const petEditModalData = (inputs: any) => {
  return [
    {
      label: 'Name',
      name: 'name',
      value: inputs.name || '',
      type: 'text',
      placeholder: 'Name',
    },
    {
      label: 'Age',
      name: 'age',
      value: inputs.age || '',
      type: 'number',
      placeholder: 'Aege',
    },
    {
      label: 'Breed',
      name: 'breedString',
      value: inputs.breedString || '',
      type: 'text',
      placeholder: 'Breed',
    },
    {
      label: 'Sex',
      name: 'sex',
      value: inputs.sex || '',
      type: 'text',
      placeholder: 'Sex',
    },
    {
      label: 'Preferred Time Of Service',
      name: 'preferredTimeOfService',
      value: inputs.preferredTimeOfService || '',
      type: 'text',
      placeholder: 'Preferred Time Of Service',
    },
    {
      label: 'Harness Location',
      name: 'harnessLocation',
      value: inputs.harnessLocation || '',
      type: 'text',
      placeholder: 'Harness Location',
    },
    {
      label: 'Drop Off Location',
      name: 'dropOffLocation',
      value: inputs.dropOffLocation || '',
      type: 'text',
      placeholder: 'Drop Off Location',
    },
    {
      label: 'Free Roaming',
      name: 'freeRoaming',
      value: inputs.freeRoaming || '',
      type: 'switch',
      placeholder: 'Free Roaming',
    },
    {
      label: 'Is Sprayed',
      name: 'isSprayed',
      value: inputs.isSprayed || '',
      type: 'switch',
      placeholder: 'Is Sprayed',
    },
    {
      label: 'Medications',
      name: 'medications',
      value: inputs.medications || '',
      type: 'text',
      placeholder: 'Medications',
    },
    {
      label: 'Allergies',
      name: 'allergies',
      value: inputs.allergies || '',
      type: 'text',
      placeholder: 'Allergies',
    },
    {
      label: 'Temperament',
      name: 'temperament',
      value: inputs.temperament || '',
      type: 'text',
      placeholder: 'Temperament',
    },
    {
      label: 'Good With Strangers',
      name: 'goodWithStrangers',
      value: inputs.goodWithStrangers || '',
      type: 'switch',
      placeholder: 'Good With Strangers',
    },
  ];
};
