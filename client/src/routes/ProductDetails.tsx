import { useQuery } from '@apollo/client';
import { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Flex, Picture, Text } from '../components/elements';
import StickyFooter from '../components/product-details/StickyFooter';
import {
  Container,
  Mask,
  ProductDetailsContainer,
  Quantity,
  SelectInput,
  SelectInputContainer,
  SizeAndQtyContainer,
} from '../components/styles/product-details';
import { GET_PRODUCT_BY_ID } from '../queries/getProductById';
import CartDrawer from '../components/product-details/CartDrawer';
import { CartContext } from '../context/cartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [qty, setQty] = useState<number | string>(1);
  const [outOfStock, setOutOfStock] = useState(false);
  const [size, setSize] = useState('');
  const {
    cart: { success },
  } = useContext(CartContext);

  const { loading, data } = useQuery(GET_PRODUCT_BY_ID, {
    variables: { id },
  });

  const product = data?.productById;
  const count = product?.countInStock;
  const amount = product?.sizes?.filter((item: any) => item?.size === size)[0]
    ?.qty;

  useEffect(() => {
    setSize(product?.sizes[0]?.size);
  }, [product]);

  useEffect(() => {
    if (count === '0' || amount === '0') return setOutOfStock(true);
    if (count >= 1 || amount >= 1) return setOutOfStock(false);
  }, [count, amount]);

  const arr = Array.from(
    {
      length: count ?? amount,
    },
    (_, i) => i
  );

  return (
    <>
      <Container>
        {success && <Mask />}
        <CartDrawer />
        {loading && <Spinner animation='border' />}
        <ProductDetailsContainer>
          <Picture
            aspectratio={['1/1']}
            objectfit={['contain']}
            margin={['0 auto']}
            background={['#edeff1']}
            src={product?.displayUrl}
            alt={product?.name}
            width='100%'
          />
          <Flex flexdirection={['column']}>
            <Text
              fontSize={['38px']}
              fontWeight={['600']}
              margin={['0 0 24px 0']}
            >
              {product?.name}
            </Text>
            <ul>
              {product?.description?.split('|').map((item: any, i: number) => (
                <Text key={i}>
                  <li>{item}</li>
                </Text>
              ))}
            </ul>
            <SizeAndQtyContainer>
              {outOfStock ? (
                <Text
                  fontSize={['1.5rem']}
                  fontWeight={['500']}
                  margin={['0 0 0.2rem 0']}
                  lineHeight={['24px']}
                >
                  Not In Stock
                </Text>
              ) : (
                <Flex>
                  {!count && (
                    <SelectInputContainer>
                      <Quantity>Size</Quantity>
                      <SelectInput
                        value={size}
                        as='select'
                        onChange={(e: any) => setSize(e.target.value)}
                      >
                        {product?.sizes?.map((x: any, i: number) => (
                          <option key={i}>{x.size}</option>
                        ))}
                      </SelectInput>
                    </SelectInputContainer>
                  )}
                  <SelectInputContainer>
                    <Quantity>Qty</Quantity>
                    <SelectInput
                      value={qty}
                      as='select'
                      onChange={(e: any) => setQty(e.target.value)}
                    >
                      {arr?.map((x: any, i: number) => (
                        <option key={i}>{x + 1}</option>
                      ))}
                    </SelectInput>
                  </SelectInputContainer>
                </Flex>
              )}
            </SizeAndQtyContainer>
          </Flex>
        </ProductDetailsContainer>
      </Container>
      <StickyFooter
        product={product}
        qty={qty}
        size={size}
        outOfStock={outOfStock}
      />
    </>
  );
};

export default ProductDetails;
