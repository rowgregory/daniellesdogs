const { gql } = require('apollo-server');

module.exports = gql`
  enum Frequency {
    DAILY
    WEEKLY
    MONTHLY
    YEARLY
  }
  enum Status {
    PENDING
    INACTIVE
    ACTIVE
    CANCELLED
  }
  enum UserType {
    ADMIN
    CLIENT
    CONSUMER
  }
  type Service {
    serviceType: String
    status: Status
    frequency: Frequency!
    amount: String
  }
  type User {
    id: ID
    firstName: String
    lastName: String
    emailAddress: String
    phoneNumber: String
    password: String
    isApproved: Boolean
    token: String
    tokenExpiration: String
    pinCode: String
    keyLocation: String
    services: [Service]
    address: Address
    newClientForm: NewClientForm
    userType: UserType
  }
  type Vet {
    id: ID
    name: String
    phoneNumber: String
    address: String
  }

  type Pet {
    id: ID
    name: String
    age: String
    breedString: String
    sex: String
    preferredTimeOfService: String
    harnessLocation: String
    dropOffLocation: String
    freeRoaming: Boolean
    isSprayed: Boolean
    medications: String
    allergies: String
    temperament: String
    goodWithStrangers: Boolean
  }

  type NewClientForm {
    id: ID
    openYard: Boolean
    pets: [Pet]
    vet: Vet
    afterMeetingNotes: String
    user: User
    address: Address
    signedWaiver: Boolean
    signedWaiverSignature: String
    signedWaiverDate: String
  }

  type Address {
    id: ID
    addressLine1: String
    city: String
    state: String
    zipPostalCode: String
  }

  type AuthTokens {
    accessToken: String
    refreshToken: String
  }

  type Message {
    message: String
  }

  input AddressInput {
    addressLine1: String
    city: String
    state: String
    zipPostalCode: String
  }

  input VetInput {
    name: String
    phoneNumber: String
    address: String
  }

  input PetInput {
    name: String
    age: String
    breedString: String
    sex: String
    preferredTimeOfService: String
    harnessLocation: String
    dropOffLocation: String
    freeRoaming: Boolean
    isSprayed: Boolean
    medications: String
    allergies: String
    temperament: String
    goodWithStrangers: Boolean
  }

  input NewClientFormInput {
    firstName: String
    lastName: String
    emailAddress: String
    phoneNumber: String
    openYard: Boolean
    address: AddressInput
    pets: [PetInput]
    vet: VetInput
    afterMeetingNotes: String
    signedWaiver: Boolean
    signedWaiverSignature: String
    signedWaiverDate: String
  }

  input NewClientFormEditInput {
    firstName: String
    lastName: String
    emailAddress: String
    phoneNumber: String
    openYard: Boolean
    address: AddressInput
    vet: VetInput
    afterMeetingNotes: String
  }

  input RegisterInput {
    firstName: String
    lastName: String
    emailAddress: String
    password: String
    confirmPassword: String
  }

  input LoginInput {
    emailAddress: String
    password: String
  }

  input ServiceInput {
    serviceType: String
    frequency: Frequency
  }

  type Query {
    getUserById(id: ID!): User
    getUserByEmail(emailAddress: String): Message
    getUsers: [User]
    getNewClientFormById(id: ID!): NewClientForm
    getNewClientForms: [NewClientForm]
    getServiceById(id: ID!): Service
    getServices: [Service]
    getPetById(id: ID!): Pet
  }

  type Mutation {
    login(loginInput: LoginInput): User
    register(registerInput: RegisterInput): User
    createNewClientForm(newClientFormInput: NewClientFormInput): NewClientForm
    updateNewClientForm(
      id: ID!
      userId: ID!
      addressId: ID!
      vetId: ID!
      newClientFormEditInput: NewClientFormEditInput
    ): NewClientForm
    deleteNewClientForm(
      id: ID
      userId: ID
      petsId: [ID]
      vetId: ID
      addressId: ID
    ): NewClientForm
    createService(serviceInput: ServiceInput): Service
    updatePet(id: ID!, petEditInput: PetInput): Pet
    createPet(id: ID, petCreateInput: PetInput): Pet
    deletePet(id: ID!): Pet
    getRefreshToken(userType: String, firstName: String): AuthTokens
  }
`;
