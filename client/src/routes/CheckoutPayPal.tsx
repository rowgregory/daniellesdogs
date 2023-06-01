import React, { useContext, useState } from 'react';
import { Text } from '../components/elements';
import {
  Container,
  LeftRail,
  LeftRailContainer,
  LeftRailSectionTitle,
  SubContainer,
} from '../components/styles/checkout';
import { Accordion } from '../components/styles/Styles';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { CartContext } from '../context/cartContext';
import { Alert, Form, FormLabel } from 'react-bootstrap';
import usePlaceOrderShippingForm from '../utils/hooks/usePlaceOrderShippingForm';
import validateShippingForm from '../components/checkout/validateShippingForm';
import ShippingForm from '../components/checkout/ShippingForm';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../mutations/createOrder';
import { useNavigate } from 'react-router-dom';
import PickUpInPersonForm from '../components/checkout/PickUpInPersonForm';
import CheckoutNavbar from '../components/checkout/CheckoutNavbar';
import ContactForm from '../components/checkout/ContactForm';
import RightRail from '../components/checkout/RightRail';
import AcrobaticLoader from '../components/AcrobaticLoader/AcrobaticLoader';

const CheckoutPayPal = () => {
  const [graphQLErrors, setGraphQLErrors] = useState([]) as any;
  const [revealContactInfo, setRevealContactInfo] = useState(true);
  const [revealShippingAddress, setRevealShippingAddress] = useState(false);
  const [revealPayment, setRevealPayment] = useState(false);
  const [orderLoader, setOrderLoader] = useState('');
  const [errors, setErrors] = useState({}) as any;
  const [userEmail, setUserEmail] = useState('test@test.com');
  const [userFullName, setUserFullName] = useState('Greg Row');
  const [step, setSteps] = useState({
    one: {
      hasCompleted: false,
      current: true,
    },
    two: {
      hasCompleted: false,
      current: false,
    },
    three: {
      hasCompleted: false,
      current: false,
    },
  }) as any;
  const navigate = useNavigate();

  const {
    cart: { cartItems, shippingPrice, taxAmount, orderTotal, clearCart },
  } = useContext(CartContext);

  let formIsValid: boolean = false;

  const shippingFormCb = async () => {
    const isValid = validateShippingForm(setErrors, inputs, formIsValid);
    if (isValid) {
      setRevealShippingAddress(false);
      setRevealPayment(true);
      setSteps({
        one: { hasCompleted: true, current: false },
        two: { hasCompleted: true, current: false },
        three: { hasCompleted: false, current: true, hasStarted: true },
      });
    }
  };

  const { handleInputChange, inputs, onSubmit } =
    usePlaceOrderShippingForm(shippingFormCb);

  const [orderCreate, { loading }] = useMutation(CREATE_ORDER, {
    onError({ graphQLErrors }) {
      setGraphQLErrors(graphQLErrors);
    },
    onCompleted(data) {
      navigate(`/order/receipt/${data.createOrder.id}`);
      localStorage.clear();
      clearCart();
    },
  });

  const successPaymentHandler = async (details: any) => {
    if (details.status === 'COMPLETED' && details.id) {
      setOrderLoader('Creating Order in MongoDB');
      await orderCreate({
        variables: {
          orderInput: {
            shippingAddress: {
              addressLine1: inputs?.address,
              city: inputs?.city,
              state: inputs?.state,
              zipPostalCode: inputs?.zipPostalCode,
            },
            taxPrice: Number(taxAmount),
            shippingPrice: Number(shippingPrice),
            totalPrice: Number(orderTotal),
            paypalOrderId: details.id,
            orderItems: cartItems,
            name: userFullName,
            emailAddress: userEmail,
            cellPhoneNumber: inputs.cellPhoneNumber,
            town: inputs.selectionOption,
          },
        },
      });
    }
  };

  const payPalComponents = {
    style: { layout: 'vertical' },
    forceRerender: ['USD', revealPayment],
    createOrder: (data: any, actions: any) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: Number(orderTotal),
            },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      });
    },
    onApprove: (data: any, actions: any) => {
      setOrderLoader('Order Approved');
      return actions.order.capture().then((details: any) => {
        successPaymentHandler(details);
      });
    },
  } as any;

  inputs?.cellPhoneNumber?.replace(/\D/g, '');

  const breadCrumbData = {
    step,
    setSteps,
    setRevealContactInfo,
    setRevealShippingAddress,
    setRevealPayment,
  };

  const contactData = {
    userFullName,
    userEmail,
    errors,
    setErrors,
    setUserFullName,
    setUserEmail,
    setRevealContactInfo,
    setRevealShippingAddress,
    setRevealPayment,
    formIsValid,
    setSteps,
  };

  return (
    <Container>
      {loading && <AcrobaticLoader />}
      {orderLoader}
      <SubContainer>
        <LeftRail className='left-rail'>
          <CheckoutNavbar breadCrumbData={breadCrumbData} />
          <LeftRailContainer>
            <LeftRailSectionTitle>
              <div className='d-flex align-items-center justify-content-between'>
                <Text
                  fontSize={['17px']}
                  color={['#000']}
                  fontWeight={['600']}
                  margin={['0 16px 4px 0']}
                  fontFamily='Arial'
                >
                  Contact
                </Text>
              </div>
              {!revealContactInfo && step.one && (
                <Text
                  fontSize={['11.5px']}
                  fontWeight={['100']}
                  fontFamily='Arial'
                >
                  {userFullName}
                  <br />
                  {userEmail}
                </Text>
              )}
            </LeftRailSectionTitle>
            <Accordion
              toggle={revealContactInfo}
              maxheight={
                errors?.userEmail && errors?.fullName ? '280px' : '254px'
              }
            >
              <ContactForm data={contactData} />
            </Accordion>
          </LeftRailContainer>
          <LeftRailContainer>
            <LeftRailSectionTitle>
              <Text
                fontSize={['17px']}
                color={['#000']}
                fontWeight={['600']}
                margin={['0 16px 4px 0']}
                fontFamily='Arial'
              >
                Delivery Options
              </Text>

              {!revealShippingAddress &&
              step.two.hasCompleted &&
              !inputs.willPickUpInPerson ? (
                <Text
                  fontSize={['11.5px']}
                  fontWeight={['100']}
                  fontFamily='Arial'
                >
                  Address <br />
                  {`${inputs.address} ${inputs.city} ${inputs.state} ${inputs.zipPostalCode}`}
                </Text>
              ) : (
                !revealShippingAddress &&
                step.two.hasCompleted && (
                  <Text
                    fontSize={['11.5px']}
                    fontWeight={['100']}
                    fontFamily='Arial'
                  >
                    Pick Up in Person <br />
                    {inputs.cellPhoneNumber?.replace(
                      /^(\d{3})(\d{3})(\d{4})$/,
                      '($1) $2-$3'
                    )}
                  </Text>
                )
              )}
            </LeftRailSectionTitle>
            <Accordion toggle={revealShippingAddress} maxheight='1000px'>
              <Form.Group
                controlId='willPickUpInPerson'
                className='d-flex mb-4 align-items-center'
              >
                <Form.Check
                  name='willPickUpInPerson'
                  type='switch'
                  checked={inputs?.willPickUpInPerson || false}
                  onChange={handleInputChange}
                ></Form.Check>
                <FormLabel
                  style={{
                    fontFamily: 'Arial',
                    fontSize: '13px',
                    marginBottom: 0,
                  }}
                >
                  Pick Up in Person?
                </FormLabel>
              </Form.Group>
              {inputs.willPickUpInPerson ? (
                <PickUpInPersonForm
                  inputs={inputs}
                  handleInputChange={handleInputChange}
                  errors={errors}
                  onSubmit={onSubmit}
                />
              ) : (
                <ShippingForm
                  inputs={inputs}
                  handleInputChange={handleInputChange}
                  errors={errors}
                  onSubmit={onSubmit}
                />
              )}
            </Accordion>
          </LeftRailContainer>
          <LeftRailContainer>
            <LeftRailSectionTitle>
              <Text
                fontSize={['17px']}
                color={['#000']}
                fontWeight={['600']}
                margin={['0 16px 4px 0']}
                fontFamily='Arial'
              >
                Secure Payment
              </Text>
            </LeftRailSectionTitle>
            <Accordion toggle={revealPayment} maxheight='1000px'>
              <PayPalButtons
                style={payPalComponents.style}
                forceReRender={payPalComponents.forceRerender}
                createOrder={payPalComponents.createOrder}
                onApprove={payPalComponents.onApprove}
              />
              {/* <Button
                onClick={() => {
                  orderCreate({
                    variables: {
                      orderInput: {
                        shippingAddress: {
                          addressLine1: inputs?.address,
                          city: inputs?.city,
                          state: inputs?.state,
                          zipPostalCode: inputs?.zipPostalCode,
                        },
                        taxPrice: Number(taxAmount),
                        shippingPrice: Number(shippingPrice),
                        totalPrice: 1000,
                        paypalOrderId: '2938FDJREDKJ',
                        orderItems: cartItems,
                        name: userFullName,
                        emailAddress: userEmail,
                        cellPhoneNumber: inputs.cellPhoneNumber,
                        town: inputs.selectionOption,
                      },
                    },
                  });
                }}
              >
                CREATE
              </Button> */}
            </Accordion>
          </LeftRailContainer>
        </LeftRail>
        <RightRail />
      </SubContainer>
      {graphQLErrors?.map((error: any, i: number) => (
        <Alert key={i}>{error?.message}</Alert>
      ))}
    </Container>
  );
};

export default CheckoutPayPal;
