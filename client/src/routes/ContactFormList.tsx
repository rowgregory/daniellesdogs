import React, { useEffect, useRef, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Link, Text } from '../components/elements';
import { Button, Spinner, Table } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useParams } from 'react-router-dom';
import { GET_CONTACT_FORMS } from '../queries/getContactForms';
import DeleteModal from '../components/DeleteModal';

const ContactFormList = () => {
  const params = useParams();
  const userId = params.user_id;
  const userType = params.user_type;
  const [getContactForms, { loading, data }] = useLazyQuery(GET_CONTACT_FORMS, {
    fetchPolicy: 'network-only',
  });
  const tableBodyRef = useRef();
  const [show, setShow] = useState(false);
  const [contactFormData, setContactFormData] = useState({}) as any;

  const handleClose = () => setShow(false);

  useEffect(() => {
    getContactForms();
  }, [getContactForms]);

  return (
    <>
      <DeleteModal
        actionFunc='Contact Form'
        show={show}
        handleClose={handleClose}
        id={contactFormData.id}
      />
      {loading && <Spinner animation='border' />}
      <div style={{ tableLayout: 'fixed', overflowX: 'auto' }}>
        <Table responsive striped hover className='table-md'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Subject</th>
              <th>Message</th>
            </tr>
          </thead>
          <TransitionGroup component='tbody'>
            {data?.contactFormList?.map((contactForm: any) => (
              <CSSTransition
                nodeRef={tableBodyRef}
                key={contactForm?.id}
                timeout={500}
                classNames='item'
              >
                <tr ref={tableBodyRef.current}>
                  <td>
                    <Text>{contactForm?.firstName}</Text>
                  </td>
                  <td>
                    <Text>{contactForm?.lastName}</Text>
                  </td>
                  <td>
                    <Text>{contactForm?.emailAddress}</Text>
                  </td>
                  <td>
                    <Text>{contactForm?.subject}</Text>
                  </td>
                  <td>
                    <Text>{contactForm?.message}</Text>
                  </td>
                  <td>
                    <Link
                      to={`/${userId}/${userType}/contact-form/${contactForm?.id}/view`}
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
                        setContactFormData(contactForm);
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

export default ContactFormList;
