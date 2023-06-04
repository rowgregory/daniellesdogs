import { currentDate } from '../currentDate';

const petValues = {
  name: '',
  age: '',
  breedString: '',
  sex: '',
  preferredTimeOfService: '',
  harnessLocation: '',
  dropOffLocation: '',
  freeRoaming: false,
  isSprayed: false,
  medications: '',
  allergies: '',
  temperament: '',
  goodWithStrangers: false,
};

const newClientFormEditValues = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  phoneNumber: '',
  address: {
    addressLine1: '',
    city: '',
    state: '',
    zipPostalCode: '',
  },
  openYard: false,
  vet: {
    name: '',
    address: '',
    phoneNumber: '',
  },
  afterMeetingNotes: '',
};

const bioValues = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  title: '',
  description: '',
  displayUrl: '',
};

const productValues = {
  name: '',
  displayUrl: '',
  description: '',
  price: '',
  countInStock: '',
  publicId: '',
  sizes: [],
  category: '',
};

const registerValues = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  password: '',
  confirmPassword: '',
};

const loginValues = {
  emailAddress: '',
  password: '',
};

const ncfBasicValues = {
  firstName: '',
  lastName: '',
  emailAddress: '',
  phoneNumber: '',
  afterMeetingNotes: '',
};
const ncfAddressValues = {
  address: {
    addressLine1: '',
    city: '',
    state: '',
    zipPostalCode: '',
  },
};

const ncfVetValues = {
  vet: {
    name: '',
    address: '',
    phoneNumber: '',
  },
};

const ncfPetsValues = {
  openYard: false,
  pets: [
    {
      ...petValues,
    },
  ],
} as any;

const ncfWaiverValues = {
  signedWaiver: false,
};

const serviceValues = {
  title: '',
  displayUrl: '',
  description: '',
  price: '',
};

export {
  petValues,
  newClientFormEditValues,
  bioValues,
  productValues,
  registerValues,
  loginValues,
  ncfBasicValues,
  ncfAddressValues,
  ncfVetValues,
  ncfPetsValues,
  ncfWaiverValues,
  serviceValues,
};
