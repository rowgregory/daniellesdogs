import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link, Text } from '../components/elements';
import { FormGroup, Table } from 'react-bootstrap';
import { GET_CONTACT_FORMS } from '../queries/getContactForms';
import DeleteModal from '../components/DeleteModal';
import {
  ContentWrapper,
  FilterInput,
  SubNav,
  TableContainer,
  TableData,
  TableHeader,
  TableRow,
} from '../components/styles/backend-tables';
import { Maze } from '../components/ContinueBtn';

const ContactFormList = () => {
  const { loading, data } = useQuery(GET_CONTACT_FORMS);
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);
  const [contactFormId, setContactFormId] = useState({}) as any;

  const handleClose = () => setShow(false);

  const filteredContactForms = data?.contactFormList?.filter((form: any) =>
    form?.firstName?.toLowerCase().includes(text?.toLowerCase())
  );

  const noContactForms = filteredContactForms?.length === 0;

  return (
    <TableContainer>
      <DeleteModal
        actionFunc='Contact Form'
        show={show}
        handleClose={handleClose}
        id={contactFormId}
      />
      <SubNav className='p-0 d-flex align-items-center'>
        <FormGroup style={{ marginLeft: '26px' }}>
          <FilterInput
            placeholder='Search by first name'
            as='input'
            type='text'
            value={text || ''}
            onChange={(e: any) => setText(e.target.value)}
          ></FilterInput>
        </FormGroup>
      </SubNav>
      <ContentWrapper>
        {loading ? (
          <Maze />
        ) : noContactForms ? (
          <Text fontFamily='Roboto' color={['#ededed']}>
            No Contact Forms
          </Text>
        ) : (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>
                  <TableHeader>First Name</TableHeader>
                </th>
                <th>
                  <TableHeader>Last Namee</TableHeader>
                </th>
                <th>
                  <TableHeader>Email Address</TableHeader>
                </th>
                <th>
                  <TableHeader>Subject</TableHeader>
                </th>
                <th>
                  <TableHeader>Message</TableHeader>
                </th>
                <th>
                  <TableHeader>View</TableHeader>
                </th>
                <th>
                  <TableHeader>Delete</TableHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredContactForms?.map((contactForm: any) => (
                <TableRow key={contactForm.id}>
                  <td>
                    <TableData>{contactForm?.firstName}</TableData>
                  </td>
                  <td>
                    <TableData>{contactForm?.lastName}</TableData>
                  </td>
                  <td>
                    <TableData>{contactForm?.emailAddress}</TableData>
                  </td>
                  <td>
                    <TableData>{contactForm?.subject}</TableData>
                  </td>
                  <td>
                    <TableData>{contactForm?.message}</TableData>
                  </td>
                  <td>
                    <Link to={`/admin/contact-forms/${contactForm?.id}/view`}>
                      <i
                        className='fas fa-edit'
                        style={{ color: '#d1d1d1' }}
                      ></i>
                    </Link>
                  </td>
                  <td>
                    <i
                      onClick={() => {
                        setContactFormId(contactForm?.id);
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

export default ContactFormList;
