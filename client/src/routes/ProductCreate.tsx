import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks/useForm';
import { validateProduct } from '../utils/validate';
import { useNavigate } from 'react-router-dom';
import { GET_PRODUCTS } from '../queries/getProducts';
import { CREATE_PRODUCT } from '../mutations/createProduct';
import {
  FormContainer,
  FormGroup,
  FormInput,
  FormLabel,
  PageTitle,
  ErrorText,
} from '../components/styles/form';
import {
  Quantity,
  SelectInput,
  SelectInputContainer,
  Size,
  SizeContainer,
} from '../components/styles/productEdit';
import NavigateBtns from '../components/NavigateBtns';
import { imgConfig } from '../utils/config';
import { productValues } from '../utils/form-values/values';
import { sizes } from '../utils/productData';

const ProductCreate = () => {
  const [errors, setErrors] = useState({}) as any;
  const [graphQLErrors, setGraphQLErrors] = useState([]) as any;
  const navigate = useNavigate();
  const [file, setFile] = useState(null) as any;
  const [uploading, setUploading] = useState(false);
  const [doesProductHaveSizes, setDoesProductHaveSizes] = useState(false);
  const [productSizes, setProductSizes] = useState([]) as any;

  const createProductCallback = async () => {
    const validForm = validateProduct(setErrors, inputs);

    if (validForm) {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      const { data } = await axios.post('/upload', formData, imgConfig);

      const hasSizes = productSizes?.length > 0;

      if (data.message === 'IMAGE_UPLOAD_SUCCESS') {
        productCreate({
          variables: {
            productInput: {
              name: inputs.name,
              price: inputs.price,
              description: inputs.description,
              countInStock: hasSizes ? '0' : inputs.countInStock,
              sizes: productSizes,
              image: data.secure_url,
              publicId: data.public_id,
            },
          },
        });
      }
    }
  };

  const { inputs, handleInputChange, setInputs, onSubmit } = useForm(
    createProductCallback,
    productValues
  );

  const [productCreate, { loading }] = useMutation(CREATE_PRODUCT, {
    onError({ graphQLErrors }) {
      setGraphQLErrors(graphQLErrors);
    },
    onCompleted() {
      setUploading(false);
      navigate(-1);
    },
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const handleChange = (e: any) => {
    setInputs((inputs: any) => ({ ...inputs, image: e.target.files[0] }));
    setFile(e.target.files[0]);
  };

  const chooseSizes = (obj: any) => {
    if (
      productSizes?.some((productSize: any) => productSize.size === obj?.size)
    ) {
      setProductSizes(productSizes?.filter((s: any) => s?.size !== obj?.size));
    } else {
      setProductSizes((prev: any) => [
        ...prev,
        { size: obj.size, qty: obj?.qty },
      ]);
    }
  };

  const isActive = (s: any) =>
    productSizes?.some((productSize: any) => productSize?.size === s?.size);

  const isSelected = (s: any) =>
    productSizes?.filter((productSize: any) => productSize?.size === s?.size)[0]
      .qty;

  const handleSelectOnChange = (e: any, s: any) =>
    setProductSizes(
      productSizes?.map((item: any) =>
        item?.size === s?.size ? { ...item, qty: e.target.value } : item
      )
    );

  return (
    <FormContainer>
      <PageTitle>Create Product</PageTitle>
      <Form>
        <FormGroup controlId='image'>
          <FormLabel className='mb-1'>Product Pic</FormLabel>
          <FormInput
            style={{ background: '#fff' }}
            type='file'
            id='image'
            onChange={handleChange}
          />
          <ErrorText>{errors?.image}</ErrorText>
        </FormGroup>
        <FormGroup controlId='name'>
          <FormLabel className='mb-1'>Name</FormLabel>
          <FormInput
            name='productName'
            value={inputs?.name || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.name}</ErrorText>
        </FormGroup>
        <FormGroup controlId='price'>
          <FormLabel className='mb-1'>Price</FormLabel>
          <FormInput
            name='productPrice'
            value={inputs?.price || ''}
            type='number'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.price}</ErrorText>
        </FormGroup>
        <FormGroup controlId='description'>
          <FormLabel className='mb-1'>Description</FormLabel>
          <FormInput
            name='productDescription'
            value={inputs?.description || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.description}</ErrorText>
        </FormGroup>
        {!doesProductHaveSizes && (
          <FormGroup controlId='countInStock'>
            <FormLabel>Count In Stock</FormLabel>
            <FormInput
              name='productCountInStock'
              type='number'
              value={inputs?.countInStock || ''}
              onChange={handleInputChange}
            />
          </FormGroup>
        )}
        <FormGroup controlId='doesProductHaveSizes'>
          <FormLabel>Does this product have sizes?</FormLabel>
          <Form.Check
            type='switch'
            checked={doesProductHaveSizes || false}
            onChange={() => setDoesProductHaveSizes(!doesProductHaveSizes)}
          ></Form.Check>
        </FormGroup>
        {doesProductHaveSizes && (
          <FormGroup className='d-flex flex-column' controlId='chooseSizes'>
            <FormLabel>Choose which sizes you want.</FormLabel>
            <SizeContainer>
              {sizes?.map((s, i) => (
                <div key={i} className='d-flex'>
                  <Size active={isActive(s)} onClick={() => chooseSizes(s)}>
                    {s?.size}
                  </Size>
                  {isActive(s) && (
                    <SelectInputContainer>
                      <Quantity>QTY</Quantity>
                      <SelectInput
                        value={isSelected(s)}
                        as='select'
                        onChange={(e: any) => handleSelectOnChange(e, s)}
                      >
                        {[...Array(20).keys()].map((x, i) => (
                          <option key={i} value={x + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </SelectInput>
                    </SelectInputContainer>
                  )}
                </div>
              ))}
            </SizeContainer>
          </FormGroup>
        )}
        <NavigateBtns
          onSubmit={onSubmit}
          text='Creat'
          loading1={loading}
          loading2={uploading}
        />
      </Form>
      {graphQLErrors?.map((error: any, i: number) => (
        <Alert key={i}>{error?.message}</Alert>
      ))}
    </FormContainer>
  );
};

export default ProductCreate;
