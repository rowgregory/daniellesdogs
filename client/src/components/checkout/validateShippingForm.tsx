import {
  validateAddressRegex,
  validatePhoneNumberRegex,
} from '../../utils/regex';

export const inputCellPhoneNumber = (
  inputs: any,
  formIsValid: any,
  setErrors: any
) => {
  console.log(inputs);
  // Remove all non-digit characters from the phone number
  const cleanedPhoneNumber = inputs.cellPhoneNumber.replace(/\D/g, '');
  console.log('cleanedPhoneNumber: ', cleanedPhoneNumber);
  // Extract the first 10 digits from the cleaned phone number
  const digits = cleanedPhoneNumber.substr(0, 10);
  if (!validatePhoneNumberRegex.test(digits)) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      cellPhoneNumber: 'Enter valid phone number to pick up in person.',
    }));
  } else {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, cellPhoneNumber: '' }));
  }

  return formIsValid;
};

export const inputAddress = (inputs: any, formIsValid: any, setErrors: any) => {
  if (!validateAddressRegex.test(inputs.address)) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      address: 'Enter address to continue.',
    }));
  } else {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, address: '' }));
  }

  return formIsValid;
};

export const inputCity = (inputs: any, formIsValid: any, setErrors: any) => {
  if (!inputs?.city || inputs?.city === '') {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      city: 'Enter city to continue.',
    }));
  } else {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, city: '' }));
  }

  return formIsValid;
};

export const inputState = (inputs: any, formIsValid: any, setErrors: any) => {
  if (!inputs?.state) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      state: 'Choose state to continue.',
    }));
  } else {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, state: '' }));
  }

  return formIsValid;
};
export const inputZipPostalCode = (
  inputs: any,
  formIsValid: any,
  setErrors: any
) => {
  if (!inputs?.zipPostalCode) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      zipPostalCode: 'Enter zip code to continue.',
    }));
  } else {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, zipPostalCode: '' }));
  }

  return formIsValid;
};

const validateShippingForm = (
  setErrors: any,
  inputs: any,
  formIsValid: any
) => {
  let hasCellPhoneNumber =
    inputs.willPickUpInPerson &&
    inputs.selectionOption !== '' &&
    inputCellPhoneNumber(inputs, formIsValid, setErrors);
  let hasAddress =
    !inputs.willPickUpInPerson && inputAddress(inputs, formIsValid, setErrors);
  let hasCity =
    !inputs.willPickUpInPerson && inputCity(inputs, formIsValid, setErrors);
  let hasState =
    !inputs.willPickUpInPerson && inputState(inputs, formIsValid, setErrors);
  let hasZipPostalCode =
    !inputs.willPickUpInPerson &&
    inputZipPostalCode(inputs, formIsValid, setErrors);

  formIsValid = [hasAddress, hasCity, hasState, hasZipPostalCode].every(
    (field: boolean) => field === true
  );

  return formIsValid || (inputs.willPickUpInPerson && hasCellPhoneNumber);
};

export default validateShippingForm;
