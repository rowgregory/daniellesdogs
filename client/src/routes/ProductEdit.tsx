import React, { useEffect, useState } from 'react';
import { Alert, Form, Spinner } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { validateProduct } from '../utils/validate';
import { useNavigate, useParams } from 'react-router-dom';
import { Picture } from '../components/elements';
import axios from 'axios';
import { GET_PRODUCT_BY_ID } from '../queries/getProductById';
import { UPDATE_PRODUCT } from '../mutations/updateProduct';
import { GET_PRODUCTS } from '../queries/getProducts';
import NavigateBtns from '../components/NavigateBtns';
import { imgConfig } from '../utils/config';
import { sizes } from '../utils/productData';
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
import { useForm } from '../utils/hooks/useForm';
import { productValues } from '../utils/form-values/values';
import { useProductForm } from '../utils/hooks/useProductForm';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}) as any;
  const [graphQLErrors, setGraphQLErrors] = useState([]) as any;
  const [file, setFile] = useState(null) as any;
  const [uploading, setUploading] = useState(false);
  const [doesProductHaveSizes, setDoesProductHaveSizes] = useState(false);
  const [productSizes, setProductSizes] = useState([]) as any;

  const { loading, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    if (data?.productById?.sizes?.length >= 1) {
      setDoesProductHaveSizes(true);
      setProductSizes(data?.productById?.sizes);
    }

    if (data?.productById?.sizes?.length === 0) {
      setDoesProductHaveSizes(false);
      setProductSizes([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const editProductCallback = async () => {
    const validForm = validateProduct(setErrors, inputs);

    if (validForm) {
      setUploading(true);
      let uploadedImage;
      if (file) {
        if (data?.productById?.publicId) {
          await axios.post(`/upload/${data.productById.publicId}`);
        }

        const formData = new FormData();
        formData.append('image', file);
        const { data: info } = await axios.post('/upload', formData, imgConfig);
        uploadedImage = info;
      }

      const hasSizes = productSizes?.length > 0;

      productEdit({
        variables: {
          id,
          productInput: {
            name: inputs.name,
            price: inputs.price,
            description: inputs.description,
            countInStock: hasSizes ? '0' : inputs.countInStock,
            sizes: productSizes,
            image: uploadedImage ? uploadedImage.secure_url : inputs.image,
            publicId: uploadedImage
              ? uploadedImage.public_id
              : data?.productById?.publicId,
          },
        },
      });
    }
  };

  const { inputs, handleInputChange, setInputs, onSubmit } = useProductForm(
    editProductCallback,
    data
  );

  const [productEdit, { loading: loadingUpdate }] = useMutation(
    UPDATE_PRODUCT,
    {
      onError({ graphQLErrors }) {
        setGraphQLErrors(graphQLErrors);
      },
      onCompleted() {
        setUploading(false);
        navigate(-1);
      },
      refetchQueries: [
        { query: GET_PRODUCT_BY_ID, variables: { id } },
        { query: GET_PRODUCTS },
      ],
    }
  );

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
      ?.qty;

  const handleSelectOnChange = (e: any, s: any) =>
    setProductSizes(
      productSizes?.map((item: any) =>
        item?.size === s?.size ? { ...item, qty: e.target.value } : item
      )
    );

  return (
    <FormContainer>
      {loading && <Spinner animation='border' />}
      <PageTitle>Edit Product</PageTitle>
      <Form>
        <Picture
          objectfit={['cover']}
          src={data?.productById?.image}
          width='200px'
          height='200px'
          borderradius={['50%']}
        />
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
            name='name'
            value={inputs?.name || ''}
            type='text'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.name}</ErrorText>
        </FormGroup>
        <FormGroup controlId='price'>
          <FormLabel className='mb-1'>Price</FormLabel>
          <FormInput
            name='price'
            value={inputs?.price || ''}
            type='number'
            onChange={handleInputChange}
          />
          <ErrorText>{errors?.price}</ErrorText>
        </FormGroup>
        <FormGroup controlId='description'>
          <FormLabel className='mb-1'>Description</FormLabel>
          <FormInput
            name='description'
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
              name='countInStock'
              type='number'
              value={inputs?.countInStock || ''}
              onChange={handleInputChange}
            />
          </FormGroup>
        )}
        <Form.Group controlId='doesProductHaveSizes'>
          <FormLabel>Does this product have sizes?</FormLabel>
          <Form.Check
            type='switch'
            checked={doesProductHaveSizes || false}
            onChange={() => {
              setDoesProductHaveSizes(!doesProductHaveSizes);
              if (doesProductHaveSizes) setProductSizes([]);
            }}
          ></Form.Check>
        </Form.Group>
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
          text='Updat'
          loading1={uploading}
          loading2={loadingUpdate}
        />
      </Form>
      {graphQLErrors?.map((error: any, i: number) => (
        <Alert key={i}>{error?.message}</Alert>
      ))}
    </FormContainer>
  );
};

export default ProductEdit;
