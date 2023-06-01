const validateEmailRegex =
  /^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

const validateFullNameRegex =
  /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{1,}\s?([a-zA-Z]{1,})?)/;

const validateAddressRegex =
  /^\d+\s+(?:[a-zA-Z]+\s+)*(?:St\.?|Rd\.?|Ave\.?|Blvd\.?|Cir\.?|Ct\.?|Dr\.?|Ln\.?|Pkwy\.?|Pl\.?|Rte\.?|Sq\.?|Ter\.?|Trl\.?|Way\.?)$/i;

const validatePhoneNumberRegex = /^\d{10}$/;

export {
  validateEmailRegex,
  validateFullNameRegex,
  validateAddressRegex,
  validatePhoneNumberRegex,
};
