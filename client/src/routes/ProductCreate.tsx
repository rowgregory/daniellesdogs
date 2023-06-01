import React, { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { validateProduct } from '../utils/validate';
import { useNavigate } from 'react-router-dom';
import { GET_PRODUCTS } from '../queries/getProducts';
import { CREATE_PRODUCT } from '../mutations/createProduct';
import { FormGroup, ErrorText } from '../components/styles/form';
import {
  Quantity,
  SelectInput,
  SelectInputContainer,
  Size,
  SizeContainer,
} from '../components/styles/productEdit';
import { productValues } from '../utils/form-values/values';
import { sizes } from '../utils/productData';
import { useProductForm } from '../utils/hooks/useProductForm';
import { API } from '../utils/api';
import { NoVideoModal } from '../components/NoVideoModal';
import {
  ContentWrapper,
  GoBackLink,
  SubNav,
  TableContainer,
  Label,
  Input,
  TextArea,
} from '../components/styles/backend-tables';
import ContinueBtn from '../components/ContinueBtn';
import { categories } from '../utils/shopCategories';

const ProductCreate = () => {
  const [errors, setErrors] = useState({}) as any;
  const [graphQLErrors, setGraphQLErrors] = useState([]) as any;
  const navigate = useNavigate();
  const [file, setFile] = useState(null) as any;
  const [uploading, setUploading] = useState(false);
  const [doesProductHaveSizes, setDoesProductHaveSizes] = useState(false);
  const [productSizes, setProductSizes] = useState([]) as any;
  const [showNoVideo, setShowNoVideo] = useState(false);

  const handleClose = () => {
    setShowNoVideo(false);
  };

  const createProductCallback = async () => {
    const validForm = validateProduct(setErrors, inputs);

    if (validForm) {
      setUploading(true);
      try {
        const res = await API.uploadImageToImgbb(file);

        const hasSizes = productSizes?.length > 0;

        if (res.data) {
          productCreate({
            variables: {
              productInput: {
                name: inputs.name,
                price: inputs.price,
                description: inputs.description,
                countInStock: hasSizes ? null : inputs.countInStock,
                sizes: productSizes,
                displayUrl: res.data.image.url,
                category: inputs.category,
              },
            },
          });
        }
      } catch (err) {
        console.error('ERROR: ', err);
        setUploading(false);
      }
    }
  };

  const { inputs, handleInputChange, setInputs, onSubmit } = useProductForm(
    createProductCallback,
    productValues
  );

  const [productCreate, { loading }] = useMutation(CREATE_PRODUCT, {
    onError({ graphQLErrors }) {
      setGraphQLErrors(graphQLErrors);
    },
    onCompleted() {
      setUploading(false);
      navigate('/admin/products');
    },
    refetchQueries: [{ query: GET_PRODUCTS }],
  });

  const handleChange = (e: any) => {
    if (['video/mp4', 'video/quicktime'].includes(e?.target?.files[0]?.type)) {
      setShowNoVideo(true);
      setUploading(false);
      return;
    } else {
      setInputs((inputs: any) => ({ ...inputs, image: e.target.files[0] }));
      setFile(e.target.files[0]);
    }
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
    <>
      <NoVideoModal show={showNoVideo} close={handleClose} />
      <TableContainer>
        <SubNav>
          <GoBackLink to='/admin/products'>GO BACK</GoBackLink>
        </SubNav>
        <ContentWrapper className='create'>
          <Form className='w-100'>
            <FormGroup className='mb-3' controlId='image'>
              <Label className='mb-1'>Product Pic</Label>
              <Input type='file' id='image' onChange={handleChange} />
              <ErrorText>{errors?.image}</ErrorText>
            </FormGroup>
            <FormGroup className='mb-3' controlId='name'>
              <Label className='mb-1'>Name</Label>
              <Input
                name='name'
                value={inputs?.name || ''}
                type='text'
                onChange={handleInputChange}
              />
              <ErrorText>{errors?.name}</ErrorText>
            </FormGroup>
            <FormGroup className='mb-3' controlId='price'>
              <Label className='mb-1'>Price</Label>
              <Input
                name='price'
                value={inputs?.price || ''}
                type='number'
                onChange={handleInputChange}
              />
              <ErrorText>{errors?.price}</ErrorText>
            </FormGroup>
            <FormGroup className='mb-3' controlId='category'>
              <Label className='mb-1'>Category</Label>
              <Input
                name='category'
                as='select'
                value={inputs.category || categories[0]}
                onChange={handleInputChange}
              >
                {categories?.map((category: any, i: number) => (
                  <option key={i} disabled={i === 0}>
                    {category}
                  </option>
                ))}
              </Input>
              <ErrorText>{errors?.category}</ErrorText>
            </FormGroup>
            <FormGroup className='mb-3' controlId='description'>
              <Label className='mb-1'>Description</Label>
              <TextArea
                name='description'
                value={inputs?.description || ''}
                rows={5}
                onChange={handleInputChange}
              />
              <ErrorText>{errors?.description}</ErrorText>
            </FormGroup>

            {!doesProductHaveSizes && (
              <FormGroup className='mb-3' controlId='countInStock'>
                <Label>Count In Stock</Label>
                <Input
                  name='countInStock'
                  type='number'
                  value={inputs?.countInStock || ''}
                  onChange={handleInputChange}
                />
              </FormGroup>
            )}
            <FormGroup className='mb-3' controlId='doesProductHaveSizes'>
              <Label>Does this product have sizes?</Label>
              <Form.Check
                type='switch'
                checked={doesProductHaveSizes || false}
                onChange={() => setDoesProductHaveSizes(!doesProductHaveSizes)}
              ></Form.Check>
            </FormGroup>
            {doesProductHaveSizes && (
              <FormGroup
                className='d-flex flex-column mb-3'
                controlId='chooseSizes'
              >
                <Label>Choose which sizes you want.</Label>
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
            <ContinueBtn
              onSubmit={onSubmit}
              text='Create'
              loading1={loading}
              loading2={uploading}
            />
          </Form>
        </ContentWrapper>
        {graphQLErrors?.map((error: any, i: number) => (
          <Alert key={i}>{error?.message}</Alert>
        ))}
      </TableContainer>
    </>
  );
};

export default ProductCreate;
