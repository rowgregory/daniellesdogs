import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Image, Spinner } from 'react-bootstrap';
import { GET_PRODUCTS } from '../queries/getProducts';
import ShopDog from '../components/assets/IMG_2120.jpeg';
import { Text } from '../components/elements';
import {
  Category,
  CategoryContainer,
  ClearFilter,
  FilterColumn,
  GridIconContainer,
  PageContent,
} from '../components/styles/shop';
import NoShop from '../components/svg/NoShop';
import { categories } from '../utils/shopCategories';
import Product from '../components/shop/Product';

const Shop = () => {
  const { loading, data } = useQuery(GET_PRODUCTS);
  const [currentCategory, setCurrentCategory] = useState('');

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Image
          src={ShopDog}
          width='100%'
          style={{ height: '700px', objectFit: 'cover' }}
        />
        <Text
          fontWeight={['500']}
          fontSize={['48px']}
          color={['#fff']}
          style={{
            position: 'absolute',
            top: '200px',
            left: '50px',
            zIndex: 2,
          }}
        >
          Danielle's Dogs Clothing & Accessories
        </Text>
      </div>
      {loading && <Spinner animation='border' />}
      <div
        style={{
          maxWidth: '1450px',
          width: '100%',
          marginInline: 'auto',
          paddingBottom: '64px',
          marginTop: '56px',
        }}
      >
        {data?.productList?.length === 0 ? (
          <div className='d-flex flex-column align-items-center'>
            <div className='mb-3'>
              <NoShop />
            </div>
            <Text>
              Sorry, no products available at the moment. Check back soon!
            </Text>
          </div>
        ) : (
          <>
            <PageContent>
              <div className='d-flex'>
                <FilterColumn>
                  <CategoryContainer className='d-flex flex-column'>
                    <Text fontWeight={['600']} margin={['0 0 10px 8px']}>
                      Category
                    </Text>
                    {categories.map((category: string, i: number) => (
                      <Category
                        active={category === currentCategory}
                        key={i}
                        onClick={() => setCurrentCategory(category)}
                      >
                        {category}
                      </Category>
                    ))}
                  </CategoryContainer>
                  <ClearFilter onClick={() => setCurrentCategory('')}>
                    Clear filter
                  </ClearFilter>
                </FilterColumn>
                <div
                  style={{
                    width: '100%',
                    marginBottom: '128px',
                    paddingInline: '16px',
                  }}
                >
                  <GridIconContainer>
                    {data?.productList?.length} item
                    {data?.productList?.length === 1 ? '' : 's'}
                  </GridIconContainer>
                  <div className='d-flex flex-column'>
                    {data?.productList?.length === 0 ? (
                      <Text margin={['16px 0 0 0']}>No products available</Text>
                    ) : (
                      data?.productList
                        ?.map((product: any, i: number) => (
                          <Product product={product} key={i} />
                        ))
                        .reverse()
                    )}
                  </div>
                </div>
              </div>
            </PageContent>
          </>
        )}
      </div>
    </>
  );
};

export default Shop;
