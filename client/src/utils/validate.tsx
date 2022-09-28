const validateEmailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const validatePhoneNumberRegex =
  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

const validateZipPostalCode = /^\d{5}(?:[-\s]\d{4})?$/;

export const validateNewClientForm = (
  setErrors: (errors: any) => void,
  inputs: any
) => {
  let formIsValid = true;
  if (!inputs?.firstName) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      firstName: 'Enter first name to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, firstName: '' }));
  }
  if (!inputs?.lastName) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      lastName: 'Enter last name to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, lastName: '' }));
  }
  if (!inputs?.emailAddress) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      emailAddress: 'Enter an email to continue.',
    }));
  } else if (!validateEmailRegex.test(inputs?.emailAddress)) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      emailAddress: 'Enter a valid email to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, emailAddress: '' }));
  }
  if (!inputs?.phoneNumber) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      phoneNumber: 'Enter a phone number to continue.',
    }));
  } else if (!validatePhoneNumberRegex.test(inputs?.phoneNumber)) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      phoneNumber: 'Enter a valid phone number to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, phoneNumber: '' }));
  }

  return formIsValid;
};

export const validateNewClientFormAddress = (
  setErrors: (errors: any) => void,
  inputs: any
) => {
  let formIsValid = true;
  if (!inputs?.address?.addressLine1) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      addressLine1: 'Enter address to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, addressLine1: '' }));
  }
  if (!inputs?.address?.city) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      city: 'Enter city to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, city: '' }));
  }
  if (!inputs?.address?.state) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      state: 'Enter state to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, state: '' }));
  }
  if (!inputs?.address?.zipPostalCode) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      zipPostalCode: 'Enter zip postal code to continue.',
    }));
  } else if (!validateZipPostalCode.test(inputs?.address?.zipPostalCode)) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      zipPostalCode: 'Enter valid zip postal code to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, zipPostalCode: '' }));
  }

  return formIsValid;
};

export const validateNewClientFormVet = (
  setErrors: (errors: any) => void,
  inputs: any
) => {
  let formIsValid = true;
  if (!inputs?.vet?.name) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      name: 'Enter name to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, name: '' }));
  }
  if (!inputs?.vet?.address) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      address: 'Enter address to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, address: '' }));
  }
  if (!inputs?.vet?.phoneNumber) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      phoneNumber: 'Enter a phone number to continue.',
    }));
  } else if (!validatePhoneNumberRegex.test(inputs?.vet?.phoneNumber)) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      phoneNumber: 'Enter a valid phone number to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, phoneNumber: '' }));
  }

  return formIsValid;
};

export const validateNewClientFormPets = (setErrors: any, inputs: any) => {
  let formIsValid = true;
  if (!inputs?.pets[0]?.name) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      name: 'Enter name to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, name: '' }));
  }
  if (!inputs?.pets[0]?.age) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      age: 'Enter age to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, age: '' }));
  }
  if (!inputs?.pets[0]?.breedString) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      breedString: 'Enter a breed to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, breedString: '' }));
  }
  if (!inputs?.pets[0]?.sex) {
    setErrors((errors: any) => ({
      ...errors,
      sex: 'Enter sex to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, sex: '' }));
  }
  if (!inputs?.pets[0]?.preferredTimeOfService) {
    setErrors((errors: any) => ({
      ...errors,
      preferredTimeOfService: 'Enter preferred time of service to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, preferredTimeOfService: '' }));
  }
  if (!inputs?.pets[0]?.harnessLocation) {
    setErrors((errors: any) => ({
      ...errors,
      harnessLocation: 'Enter harness location to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, harnessLocation: '' }));
  }
  if (!inputs?.pets[0]?.dropOffLocation) {
    setErrors((errors: any) => ({
      ...errors,
      dropOffLocation: 'Enter drop off location to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, dropOffLocation: '' }));
  }
  if (!inputs?.pets[0]?.medications) {
    setErrors((errors: any) => ({
      ...errors,
      medications: 'Enter medications to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, medications: '' }));
  }
  if (!inputs?.pets[0]?.allergies) {
    setErrors((errors: any) => ({
      ...errors,
      allergies: 'Enter allergies to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, allergies: '' }));
  }

  return formIsValid;
};

export const validateNewClientFormWaiver = (setErrors: any, inputs: any) => {
  let formIsValid = true;
  if (!inputs?.signedWaiverSignature) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      signedWaiverSignature: 'Sign waiver to complete.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, signedWaiverSignature: '' }));
  }
  if (!inputs?.signedWaiverDate) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      signedWaiverDate: 'Enter date to complete.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, signedWaiverDate: '' }));
  }

  return formIsValid;
};

export const validateContactForm = (
  setErrors: (errors: any) => void,
  inputs: any
) => {
  let formIsValid = true;
  if (!inputs?.firstName) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      firstName: 'Enter first name to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, firstName: '' }));
  }
  if (!inputs?.lastName) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      lastName: 'Enter last name to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, lastName: '' }));
  }
  if (!inputs?.emailAddress) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      emailAddress: 'Enter an email to continue.',
    }));
  } else if (!validateEmailRegex.test(inputs?.emailAddress)) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      emailAddress: 'Enter a valid email to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, emailAddress: '' }));
  }
  if (!inputs?.subject) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      subject: 'Enter subject to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, subject: '' }));
  }
  if (!inputs?.message) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      message: 'Enter message to continue.',
    }));
  } else {
    setErrors((errors: any) => ({ ...errors, message: '' }));
  }

  return formIsValid;
};
