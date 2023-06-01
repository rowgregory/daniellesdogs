import { validateEmailRegex, validateFullNameRegex } from '../../utils/regex';

export const validateFullName = (
  userFullName: any,
  formIsValid: any,
  setErrors: any
) => {
  if (!validateFullNameRegex.test(userFullName)) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      fullName: 'Enter full name to continue',
    }));
  } else {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, fullName: '' }));
  }

  return formIsValid;
};

export const validateEmailAddress = (
  userEmail: any,
  formIsValid: any,
  setErrors: any
) => {
  if (!validateEmailRegex.test(userEmail)) {
    formIsValid = false;
    setErrors((errors: any) => ({
      ...errors,
      userEmail: 'Enter valid email address to continue',
    }));
  } else {
    formIsValid = true;
    setErrors((errors: any) => ({ ...errors, userEmail: '' }));
  }

  return formIsValid;
};

const validateContactInfo = (
  setErrors: any,
  userDetails: any,
  formIsValid: any
) => {
  let validEmailAddress = validateEmailAddress(
    userDetails.userEmail,
    formIsValid,
    setErrors
  );
  let validFullName = validateFullName(
    userDetails.userFullName,
    formIsValid,
    setErrors
  );

  formIsValid = [validEmailAddress, validFullName].every(
    (field: boolean) => field === true
  );

  return formIsValid;
};

export default validateContactInfo;
