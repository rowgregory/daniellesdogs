import React, { useEffect, useRef, useState } from 'react';
import { Alert, Form, Spinner } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { validateProduct } from '../utils/validate';
import { useParams } from 'react-router-dom';
import { Flex, Picture } from '../components/elements';
import { GET_PRODUCT_BY_ID } from '../queries/getProductById';
import { UPDATE_PRODUCT } from '../mutations/updateProduct';
import { GET_PRODUCTS } from '../queries/getProducts';
import { sizes } from '../utils/productData';
import { FormGroup, ErrorText } from '../components/styles/form';
import {
  Quantity,
  SelectInput,
  SelectInputContainer,
  Size,
  SizeContainer,
} from '../components/styles/productEdit';
import { useProductForm } from '../utils/hooks/useProductForm';
import { API } from '../utils/api';
import ToastNoti from '../components/ToastNoti';
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

const ProductEdit = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState({}) as any;
  const [graphQLErrors, setGraphQLErrors] = useState([]) as any;
  const [file, setFile] = useState(null) as any;
  const [uploading, setUploading] = useState(false);
  const [doesProductHaveSizes, setDoesProductHaveSizes] = useState(false);
  const [productSizes, setProductSizes] = useState([]) as any;
  const [showNoVideo, setShowNoVideo] = useState(false);
  const handleClose = () => setShowNoVideo(false);
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const validForm = validateProduct(setErrors, inputs, true);

    if (validForm) {
      setUploading(true);

      try {
        let res;
        if (file?.name) {
          res = await API.uploadImageToImgbb(file);
          if (res.status_code === 400) {
            setUploading(false);
            setShowNoVideo(true);

            return;
          }
        }

        const hasSizes = productSizes?.length > 0;

        productEdit({
          variables: {
            id,
            productInput: {
              name: inputs.name,
              price: inputs.price,
              description: inputs.description,
              countInStock: hasSizes ? null : inputs.countInStock,
              sizes: productSizes,
              displayUrl: res?.data?.image?.url ?? inputs.displayUrl,
              category: inputs.category,
            },
          },
        });
      } catch (err) {
        console.log('ERROR: ', err);
      }
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
        setShowToast(true);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      },
      refetchQueries: [
        { query: GET_PRODUCT_BY_ID, variables: { id } },
        { query: GET_PRODUCTS },
      ],
    }
  );

  const handleChange = (e: any) => {
    if (['video/mp4', 'video/quicktime'].includes(e?.target?.files[0]?.type)) {
      setShowNoVideo(true);
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
      ?.qty;

  const handleSelectOnChange = (e: any, s: any) =>
    setProductSizes(
      productSizes?.map((item: any) =>
        item?.size === s?.size ? { ...item, qty: e.target.value } : item
      )
    );

  return (
    <>
      <ToastNoti
        showToast={showToast}
        setShowToast={setShowToast}
        options={{ bg: '#0a9900', header: 'Success', body: 'Product updated' }}
      />
      <NoVideoModal show={showNoVideo} close={handleClose} />
      <TableContainer>
        {loading && <Spinner animation='border' />}
        <SubNav>
          <GoBackLink to='/admin/products'>GO BACK</GoBackLink>
        </SubNav>
        <ContentWrapper className='edit'>
          <Form className='d-flex flex-column w-100'>
            <Flex
              flexDirection={['column']}
              alignItems={['center']}
              margin={['0 0 0 0', '0 0 0 32px']}
            >
              <Label>CURRENT PIC</Label>
              <Picture
                src={data?.productById?.displayUrl}
                width='100px'
                height='100px'
                borderradius={['50%']}
                objectfit={['cover']}
                style={{ border: '2px solid #0e1117' }}
              />
            </Flex>
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
            <Form.Group className='mb-3' controlId='category'>
              <Label>Category</Label>
              <Input
                name='category'
                as='select'
                value={inputs.category || ''}
                onChange={handleInputChange}
              >
                {categories?.map((category: any, i: number) => (
                  <option key={i}>{category}</option>
                ))}
              </Input>
              <ErrorText>{errors?.category}</ErrorText>
            </Form.Group>
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
                <Label className='mb-1'>Count In Stock</Label>
                <Input
                  name='countInStock'
                  type='number'
                  value={inputs?.countInStock || ''}
                  onChange={handleInputChange}
                />
              </FormGroup>
            )}
            <FormGroup className='mb-3' controlId='doesProductHaveSizes'>
              <Label className='mb-1'>Does this product have sizes?</Label>
              <Form.Check
                type='switch'
                checked={doesProductHaveSizes || false}
                onChange={() => {
                  setDoesProductHaveSizes(!doesProductHaveSizes);
                  if (doesProductHaveSizes) setProductSizes([]);
                }}
              ></Form.Check>
            </FormGroup>
            {doesProductHaveSizes && (
              <FormGroup
                className='d-flex flex-column mb-3'
                controlId='chooseSizes'
              >
                <Label className='mb-1'>Choose which sizes you want.</Label>
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
              text='Update'
              loading1={uploading}
              loading2={loadingUpdate}
              loading3={loading}
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

export default ProductEdit;
