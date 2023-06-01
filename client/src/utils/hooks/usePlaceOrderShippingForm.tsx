import { useContext, useState } from 'react';
import { CartContext } from '../../context/cartContext';

const usePlaceOrderShippingForm = (cb: any) => {
  const { cart } = useContext(CartContext);
  const [inputs, setInputs] = useState({
    willPickUpInPerson: false,
    selectionOption: '',
    cellPhoneNumber: '',
    verificationCode: '',
    showVerificationCodeInput: false,
    address: '',
    city: '',
    state: '',
    zipPostalCode: '',
  }) as any;

  const handleInputChange = (e: any) => {
    setInputs((inputs: any) => ({
      ...inputs,
      [e.target.name]: e.target.value,
    }));

    if (e.target.name === 'state') {
      cart.calculateTaxAmount(e.target.value);
    }

    if (e.target.name === 'willPickUpInPerson') {
      cart.removeShippingPrice(e.target.checked);
      setInputs((inputs: any) => ({
        ...inputs,
        [e.target.name]: e.target.checked,
      }));
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    cb();
  };

  return { inputs, handleInputChange, onSubmit, setInputs };
};

export default usePlaceOrderShippingForm;
