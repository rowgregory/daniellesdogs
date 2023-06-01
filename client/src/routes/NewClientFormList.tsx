import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GET_NEW_CLIENT_FORMS } from '../queries/getNewClientForms';
import { FormGroup } from '../components/styles/form';
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
import { Text } from '../components/elements';

const NewClientForms = () => {
  const { loading, data } = useQuery(GET_NEW_CLIENT_FORMS);
  const [text, setText] = useState('');
  const [formData, setFormData] = useState({}) as any;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const filteredNewClientForms = data?.getNewClientForms?.filter((form: any) =>
    form?.user.firstName?.toLowerCase().includes(text?.toLowerCase())
  );

  const noClients = filteredNewClientForms?.length === 0;

  return (
    <TableContainer>
      <DeleteModal
        actionFunc='New Client Form'
        show={showDeleteModal}
        handleClose={setShowDeleteModal}
        id={formData}
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
        ) : noClients ? (
          <Text fontFamily='Roboto' color={['#ededed']}>
            No Clients
          </Text>
        ) : (
          <Table responsive striped hover size='lg'>
            <thead>
              <tr>
                <th>
                  <TableHeader>First Name</TableHeader>
                </th>
                <th>
                  <TableHeader>Last Name</TableHeader>
                </th>
                <th>
                  <TableHeader>Email Address</TableHeader>
                </th>
                <th>
                  <TableHeader>Phone Number</TableHeader>
                </th>
                <th>
                  <TableHeader>Pet(s)</TableHeader>
                </th>
                <th>
                  <TableHeader>Edit</TableHeader>
                </th>
                <th>
                  <TableHeader className='delete'>Delete</TableHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredNewClientForms?.map((form: any) => (
                <TableRow key={form?.id}>
                  <td>
                    <TableData>{form?.user?.firstName}</TableData>
                  </td>
                  <td>
                    <TableData>{form?.user?.lastName}</TableData>
                  </td>
                  <td>
                    <TableData>{form?.user?.emailAddress}</TableData>
                  </td>
                  <td>
                    <TableData>{form?.user?.phoneNumber}</TableData>
                  </td>
                  <td>
                    <TableData
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                      }}
                    >
                      {form?.pets?.map((pet: any, i: number) => (
                        <div key={i}>
                          {pet.name}: {pet.breedString}
                        </div>
                      ))}
                    </TableData>
                  </td>

                  <td>
                    <Link to={`/admin/new-client-forms/${form.id}`}>
                      <i
                        className='fas fa-edit'
                        style={{ color: '#d1d1d1' }}
                      ></i>
                    </Link>
                  </td>
                  <td>
                    <i
                      onClick={() => {
                        setFormData(form);
                        setShowDeleteModal(true);
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

export default NewClientForms;
