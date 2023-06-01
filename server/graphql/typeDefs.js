const { gql } = require('apollo-server');

module.exports = gql`
  scalar String

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
    id: ID
    displayUrl: String
    title: String
    price: String
    description: String
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
    address: Address
    newClientForm: NewClientForm
    userType: UserType
    lastLoginTime: String
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
  }

  type Address {
    id: ID
    addressLine1: String
    city: String
    state: String
    zipPostalCode: String
  }

  type AuthTokens {
    refreshToken: String
  }

  type Message {
    message: String
  }

  type GalleryImage {
    id: ID
    displayUrl: String
    width: Int
    height: Int
    mimetype: String
    title: String
    size: Int
    mediumImgUrl: String
    thumbUrl: String
  }

  type ContactForm {
    id: ID
    firstName: String
    lastName: String
    emailAddress: String
    subject: String
    message: String
    createdAt: String
  }

  type Bio {
    id: ID
    firstName: String
    lastName: String
    emailAddress: String
    title: String
    description: String
    displayUrl: String
  }

  type Size {
    size: String
    qty: String
  }

  type Product {
    id: ID
    name: String
    displayUrl: String
    description: String
    price: String
    countInStock: String
    sizes: [Size]
    category: String
  }

  type Passcode {
    id: ID
    passcode: String
  }

  type OrderItem {
    name: String!
    qty: Int
    displayUrl: String!
    price: Float!
    product: Product!
    size: String
  }

  type Order {
    id: ID!
    orderItems: [OrderItem!]!
    shippingAddress: Address
    taxPrice: Float!
    shippingPrice: Float
    totalPrice: Float!
    paidOn: String
    isShipped: Boolean
    shippedOn: String
    paypalOrderId: String!
    name: String!
    emailAddress: String!
    cellPhoneNumber: String
    town: String
    createdAt: String!
    updatedAt: String!
  }

  type Totals {
    orderCount: Int!
    newClientFormCount: Int!
    galleryImageCount: Int!
    contactFormCount: Int!
  }

  type BarChartData {
    datasets: [Float!]
  }
  type TransformedNewClientForm {
    firstName: String
    lastName: String
    emailAddress: String
    phoneNumber: String
    pets: [String]
  }

  type RecentOrders {
    displayUrl: String
    name: String
    productName: String
    totalPrice: Float
    id: ID
  }

  type UpdateOrderResult {
    success: Boolean!
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
    displayUrl: String
    title: String
    price: String
    description: String
  }

  input ContactFormInput {
    firstName: String
    lastName: String
    emailAddress: String
    subject: String
    message: String
  }

  input BioInput {
    firstName: String
    lastName: String
    emailAddress: String
    title: String
    description: String
    displayUrl: String
  }

  input SizeInput {
    size: String
    qty: String
  }

  input ProductInput {
    name: String
    displayUrl: String
    description: String
    price: String
    countInStock: String
    sizes: [SizeInput]
    category: String
  }

  input GalleryImageInput {
    displayUrl: String
    width: Int
    height: Int
    mimetype: String
    title: String
    size: Int
    mediumImgUrl: String
    thumbUrl: String
  }

  input OrderInput {
    shippingAddress: AddressInput
    taxPrice: Float!
    shippingPrice: Float
    totalPrice: Float!
    paypalOrderId: String!
    orderItems: [OrderItemInput!]
    name: String!
    emailAddress: String!
    cellPhoneNumber: String
    town: String
  }

  input OrderItemInput {
    countInStock: String
    name: String
    qty: Int
    displayUrl: String
    price: String
    product: ID
    size: String
    sizes: [SizeInput]
  }

  type Query {
    getUserById(id: ID!): User
    getUserByEmail(emailAddress: String): Boolean
    getUsers: [User]
    getNewClientFormById(id: ID!): NewClientForm
    getNewClientForms: [NewClientForm]
    getServiceById(id: ID!): Service
    getPetById(id: ID!): Pet
    galleryImageList: [GalleryImage]
    bioList: [Bio]
    bioById(id: ID!): Bio
    contactFormList: [ContactForm]
    contactFormById(id: ID!): ContactForm
    productList: [Product]
    productById(id: ID!): Product
    retreivePasscode(passcodeAttempt: String): Boolean
    getOrderById(id: ID!): Order
    orderList: [Order]
    getOrdersClientsGalleryImagesContactFormsTotals: Totals!
    getSalesByMonth: BarChartData!
    getTransformedNewClientForm: [TransformedNewClientForm]
    getRecentOrders: [RecentOrders]
    serviceList: [Service]
    serviceById(id: ID!): Service
  }

  type Mutation {
    login(loginInput: LoginInput): User
    register(registerInput: RegisterInput): User
    createNewClientForm(newClientFormInput: NewClientFormInput): NewClientForm
    updateNewClientForm(
      id: ID
      userId: ID
      addressId: ID
      vetId: ID
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
    updateService(id: ID!, serviceInput: ServiceInput): Service
    deleteService(id: ID!): Service
    updatePet(id: ID!, petEditInput: PetInput): Pet
    createPet(id: ID, petCreateInput: PetInput): Pet
    deletePet(id: ID!): Pet
    getRefreshToken(userType: String, firstName: String): AuthTokens
    deleteGalleryImage(id: ID!): Message
    createGalleryImage(galleryImageInput: GalleryImageInput): GalleryImage
    createContactForm(contactFormInput: ContactFormInput): ContactForm
    deleteContactForm(id: ID!): ContactForm
    createBio(bioInput: BioInput): Bio
    updateBio(id: ID!, bioInput: BioInput): Bio
    deleteBio(id: ID!): Bio
    createProduct(productInput: ProductInput): Product
    updateProduct(id: ID!, productInput: ProductInput): Product
    deleteProduct(id: ID!): Product
    createOrder(orderInput: OrderInput!): Order!
    logoutUser(id: ID!): User
    updateOrderToShipped(id: ID!): UpdateOrderResult
  }
`;
