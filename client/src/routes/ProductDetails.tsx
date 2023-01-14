import React, { useContext, useEffect, useState } from 'react';
import { Col, Image, Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Text } from '../components/elements';
import LeftArrow from '../components/elements/LeftArrow';
import {
  AddToCartBtn,
  HorizontalLine,
  ProductDetailsContainer,
  Quantity,
  SelectInput,
  SelectInputContainer,
  ThirdColumnWrapper,
} from '../components/styles/product-details';
import { AuthContext } from '../context/authContext';

const ProductDetails = () => {
  const [qty, setQty] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [size, setSize] = useState('');
  const [outOfStock, setOutOfStock] = useState(false);
  const context = useContext(AuthContext) as any;

  const {
    state: { product },
  } = useLocation() as any;
  console.log(product);

  // useEffect(() => {
  //   const isProduct = product !== undefined && Object.keys(product).length > 0;

  //   if (isProduct) {
  //     const objIndex = product?.sizes?.findIndex(
  //       (obj: any) => obj?.size === size
  //     );
  //     const productAmount =
  //       product?.sizes?.[objIndex >= 0 ? objIndex : 0]?.amount;

  //     setSize(product?.sizes?.[objIndex >= 0 ? objIndex : 0]?.size);

  //     if (productAmount === 0) return setOutOfStock(true);
  //     if (productAmount >= 1) return setOutOfStock(false);
  //   }
  //   if (product?.countInStock === 0) return setOutOfStock(true);
  //   if (product?.countInStock >= 1) return setOutOfStock(false);
  // }, [product, size]);

  const addToCartHandler = (item?: any) => {
    context.cart.addItemToCart(item, qty, size);
  };

  console.log('cart items: ', context.cart);

  // if (errorProductPublicDetails)
  //   return <Message variant='danger'>{errorProductPublicDetails}</Message>;

  return (
    <div
      style={{
        padding: '128px 16px',
        maxWidth: '1400px',
        marginInline: 'auto',
        width: '100%',
      }}
    >
      <LeftArrow text='Shop' url='/shop' />
      <ProductDetailsContainer>
        <Image
          src={product?.image}
          alt={product?.name}
          width='100%'
          style={{
            aspectRatio: '1/1',
            objectFit: 'contain',
            maxWidth: '600px',
            marginBottom: '24px',
          }}
        />
        <Col>
          <Text fontSize={['28px']} fontWeight={['400']}>
            {product?.name}
          </Text>
          <HorizontalLine margin='0 0 1rem 0' />
          <div className='d-flex'>
            <div style={{ position: 'relative' }}>
              <Text style={{ position: 'absolute', top: '6px' }}>$</Text>
            </div>
            <Text
              margin={['0 0 0.8rem 0.7rem']}
              fontWeight={['bold']}
              fontSize={['2rem']}
              position={['relative']}
            >
              {product?.price?.toString()?.split('.')[0]}
              <sup
                style={{
                  fontWeight: '500',
                  fontSize: '0.8rem',
                  top: '-15px',
                }}
              >
                {product?.price?.toString()?.split('.')[1]}
              </sup>
            </Text>
          </div>
          {/* {message && (
            <Message variant='success'>
              {message} <span onClick={() => setMessage('')}>X</span>
            </Message>
          )} */}
          {product?.sizes?.length !== 0 && (
            <SelectInputContainer
              style={{
                width: '84px',
                border: 0,
                marginBottom: '1rem',
              }}
            >
              <Quantity>Size</Quantity>
              <SelectInput
                value={size}
                as='select'
                onChange={(e: any) => setSize(e.target.value)}
              >
                {product?.sizes?.map((x: any, i: number) => (
                  <option key={i} value={x?.size}>
                    {x.size}
                  </option>
                ))}
              </SelectInput>
            </SelectInputContainer>
          )}
          <HorizontalLine margin='0 0 1rem 0' />
          <Text fontWeight={['bold']}>About this item</Text>
          <ul className='pl-4'>
            {product?.description?.split('|').map((item: any, i: number) => (
              <Text key={i}>
                <li>{item}</li>
              </Text>
            ))}
          </ul>
        </Col>
        <Col>
          <ThirdColumnWrapper>
            <div className='d-flex'>
              <div style={{ position: 'relative' }}>
                <Text style={{ position: 'absolute', top: '6px' }}>$</Text>
              </div>
              <Text
                margin={['0 0 0.8rem 0.7rem']}
                fontWeight={['bold']}
                fontSize={['2rem']}
                position={['relative']}
              >
                {product?.price?.toString()?.split('.')[0]}
                <sup
                  style={{
                    fontWeight: '500',
                    fontSize: '0.8rem',
                    top: '-15px',
                  }}
                >
                  {product?.price?.toString()?.split('.')[1]}
                </sup>
              </Text>
            </div>
            <Text
              fontSize={['1.5rem']}
              fontWeight={['500']}
              fontFamily='Duru Sans'
              margin={['0 0 0.2rem 0']}
              style={{
                textRendering: 'optimizeLegibility',
                lineHeight: '24px',
              }}
            >
              {outOfStock ? 'Not In stock' : 'In stock'}
            </Text>
            {!outOfStock && (
              <>
                <Text margin={['0 0 1rem 0']} fontWeight={['400']}>
                  Usually ships within 4 to 5 days
                </Text>

                <SelectInputContainer
                  style={{
                    width: '90px',
                    marginBottom: '0.75rem',
                  }}
                >
                  <Quantity>Qty</Quantity>
                  <SelectInput
                    value={qty}
                    as='select'
                    onChange={(e: any) => setQty(e.target.value)}
                  >
                    {[
                      ...Array(
                        product?.sizes?.length >= 1
                          ? product?.sizes?.filter(
                              (item: any) => item?.size === size
                            )[0]?.amount === -1
                            ? 0
                            : product?.sizes?.filter(
                                (item: any) => item?.size === size
                              )[0]?.amount
                          : product?.countInStock
                      ).keys(),
                    ].map((x: any, i: number) => (
                      <option key={i} value={x?.amount}>
                        {x + 1}
                      </option>
                    ))}
                  </SelectInput>
                </SelectInputContainer>
              </>
            )}
            <AddToCartBtn
              disabled={outOfStock}
              onClick={() => addToCartHandler(product)}
            >
              Add To Cart
            </AddToCartBtn>
          </ThirdColumnWrapper>
        </Col>
      </ProductDetailsContainer>
    </div>
  );
};

export default ProductDetails;
