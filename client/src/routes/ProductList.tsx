import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link, Picture, Text } from '../components/elements';
import { Table } from 'react-bootstrap';
import DeleteModal from '../components/DeleteModal';
import { GET_PRODUCTS } from '../queries/getProducts';
import {
  ContentWrapper,
  CreateLink,
  SubNav,
  TableContainer,
  TableData,
  TableHeader,
  TableRow,
} from '../components/styles/backend-tables';
import { Maze } from '../components/ContinueBtn';

const ProductList = () => {
  const { loading, data } = useQuery(GET_PRODUCTS);
  const [show, setShow] = useState(false);
  const [productData, setProductData] = useState({}) as any;
  const handleClose = () => setShow(false);

  const noProducts = data?.productList?.length === 0;

  return (
    <TableContainer>
      <DeleteModal
        actionFunc='Product'
        show={show}
        handleClose={handleClose}
        id={productData.id}
        image={productData.displayUrl}
      />
      <SubNav>
        <CreateLink to='/admin/products/create'>CREATE PRODUCT</CreateLink>
      </SubNav>
      <ContentWrapper>
        {loading ? (
          <Maze />
        ) : noProducts ? (
          <Text fontFamily='Roboto' color={['#ededed']}>
            Click on the button to create a product
          </Text>
        ) : (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>
                  <TableHeader>Name</TableHeader>
                </th>
                <th>
                  <TableHeader>Image</TableHeader>
                </th>
                <th>
                  <TableHeader>Price</TableHeader>
                </th>
                <th>
                  <TableHeader>Count In Stock</TableHeader>
                </th>
                <th>
                  <TableHeader>Size/Qty</TableHeader>
                </th>
                <th>
                  <TableHeader>Edit</TableHeader>
                </th>
                <th>
                  <TableHeader>Delete</TableHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.productList?.map((product: any) => (
                <TableRow key={product?.id}>
                  <td>
                    <TableData>{product?.name}</TableData>
                  </td>
                  <td>
                    <Picture
                      src={product?.displayUrl}
                      borderradius={['50%']}
                      objectfit={['cover']}
                      width='35px'
                      height='35px'
                    />
                  </td>
                  <td>
                    <TableData>${Number(product?.price)?.toFixed(2)}</TableData>
                  </td>
                  <td>
                    <TableData>
                      {product?.countInStock === null ? (
                        <TableData>N/A</TableData>
                      ) : (
                        product?.countInStock
                      )}
                    </TableData>
                  </td>
                  <td>
                    {product?.sizes?.length === 0 ? (
                      <TableData>N/A</TableData>
                    ) : (
                      product?.sizes?.map((obj: any, i: number) => (
                        <div
                          key={i}
                          className='d-grid'
                          style={{ gridTemplateColumns: '50px 50px' }}
                        >
                          <TableData>{obj?.size}</TableData>
                          <TableData>{obj?.qty}</TableData>
                        </div>
                      ))
                    )}
                  </td>

                  <td>
                    <Link to={`/admin/products/${product.id}/edit`}>
                      <i
                        className='fas fa-edit'
                        style={{ color: '#d1d1d1' }}
                      ></i>
                    </Link>
                  </td>
                  <td>
                    <i
                      onClick={() => {
                        setProductData(product);
                        setShow(true);
                      }}
                      className='fas fa-trash'
                      style={{ color: 'red' }}
                    ></i>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </ContentWrapper>
    </TableContainer>
  );
};

export default ProductList;
