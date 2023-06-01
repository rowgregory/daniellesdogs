import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_PRODUCTS } from '../queries/getProducts';
import { Text } from '../components/elements';
import {
  Category,
  CategoryContainer,
  ClearFilter,
  FilterColumn,
  GridIconContainer,
  ItemsContainer,
  PageContent,
} from '../components/styles/shop';
import { categories } from '../utils/shopCategories';
import Product from '../components/shop/Product';
import { Spinner } from 'react-bootstrap';

const Shop = () => {
  const { loading, data } = useQuery(GET_PRODUCTS);
  const [currentCategory, setCurrentCategory] = useState('');

  const filterProducts = data?.productList?.filter((product: any) =>
    product?.category?.includes(currentCategory)
  );

  return (
    <>
      <div
        style={{
          maxWidth: '1450px',
          width: '100%',
          marginInline: 'auto',
          paddingBottom: '64px',
          paddingTop: '56px',
          display: 'flex',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        {data?.productList?.length === 0 ? (
          <div className='d-flex flex-column align-items-center mt-5'>
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
                  <ItemsContainer>
                    {loading ? (
                      <Spinner animation='border' size='sm' />
                    ) : data?.productList?.length === 0 ? (
                      <Text margin={['16px 0 0 0']}>No products available</Text>
                    ) : (
                      filterProducts
                        ?.map((product: any, i: number) => (
                          <Product product={product} key={i} />
                        ))
                        .reverse()
                    )}
                  </ItemsContainer>
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
