import React, { useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link, Text } from '../components/elements';
import { Button, Image, Spinner, Table } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useParams } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import { GET_PRODUCTS } from '../queries/getProducts';

const ProductList = () => {
  const params = useParams();
  const userId = params.user_id;
  const userType = params.user_type;
  const { loading, data } = useQuery(GET_PRODUCTS);
  const tableBodyRef = useRef();
  const [show, setShow] = useState(false);
  const [productData, setProductData] = useState({}) as any;

  const handleClose = () => setShow(false);

  return (
    <>
      <DeleteModal
        actionFunc='Product'
        show={show}
        handleClose={handleClose}
        id={productData.id}
        publicId={productData.publicId}
      />
      {loading && <Spinner animation='border' />}
      <Link
        style={{ borderBottom: '1px dotted #121212' }}
        to={`/${userId}/${userType}/products/create`}
      >
        Create Product
      </Link>
      <div style={{ tableLayout: 'fixed', overflowX: 'auto' }}>
        <Table responsive striped hover className='table-md'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Count In Stock</th>
              <th>Size/Qty</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <TransitionGroup component='tbody'>
            {data?.productList?.map((product: any) => (
              <CSSTransition
                nodeRef={tableBodyRef}
                key={product?.id}
                timeout={500}
                classNames='item'
              >
                <tr ref={tableBodyRef.current}>
                  <td>
                    <Text>{product?.name}</Text>
                  </td>
                  <td>
                    <Image
                      src={product?.image}
                      width='50px'
                      height='50px'
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </td>
                  <td>
                    <Text>{product?.price}</Text>
                  </td>
                  <td>
                    <Text>
                      {product?.countInStock === '0'
                        ? '--'
                        : product?.countInStock}
                    </Text>
                  </td>
                  <td>
                    {product?.sizes?.map((obj: any, i: number) => (
                      <div
                        key={i}
                        className='d-grid'
                        style={{ gridTemplateColumns: '50px 50px' }}
                      >
                        <Text>{obj.size}</Text>
                        <Text>{obj.qty}</Text>
                      </div>
                    ))}
                  </td>

                  <td>
                    <Link
                      to={`/${userId}/${userType}/products/${product.id}/edit`}
                    >
                      <Button className='btn-md'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-md'
                      onClick={() => {
                        setProductData(product);
                        setShow(true);
                      }}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Table>
      </div>
    </>
  );
};

export default ProductList;
