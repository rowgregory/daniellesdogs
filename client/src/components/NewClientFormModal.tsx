import { useLazyQuery } from '@apollo/client';
import React, { FC, useEffect } from 'react';
import { Alert, Modal, Spinner } from 'react-bootstrap';
import { GET_NEW_CLIENT_FORM_BY_ID } from '../queries/getNewClientFormById';
import { Text, Wrapper } from './elements';

interface NewClientFormModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  id: string;
}

const NewClientFormModal: FC<NewClientFormModalProps> = ({
  show,
  setShow,
  id: formId,
}) => {
  const [loadFormData, { loading, error, data }] = useLazyQuery(
    GET_NEW_CLIENT_FORM_BY_ID
  );

  let userData: any = [];
  let petsData: any = [];

  if (data) {
    const {
      getNewClientFormById: { address, id, openYard, pets, user, vet },
    } = data && data;

    userData = [
      { textKey: 'Form Id: ', field: id },
      { textKey: 'First Name: ', field: user?.firstName },
      { textKey: 'Last Name: ', field: user?.lastName },
      { textKey: 'Email Address: ', field: user?.emailAddress },
      { textKey: 'Phone Number: ', field: user?.phoneNumber },
      { textKey: 'Open Yard: ', field: openYard },
    ];

    // pets.map((pet: any) => {
    //   const keys = Object.keys(pet);
    //   const values = Object.values(pet);
    //   return keys.forEach((el, i) =>
    //     petsData.push({ textKey: capitalizeFirstLetter(el), field: values[i] })
    //   );
    // });

    petsData = pets;

    const addressAndVetArr = [
      { textKey: 'Address: ', field: address?.addressLine1 },
      { textKey: 'City: ', field: address?.city },
      { textKey: 'State: ', field: address?.state },
      { textKey: 'Zip/Postal Code: ', field: address?.zipPostalCode },
      { textKey: 'Name: ', field: vet?.name },
      { textKey: 'Phone Number: ', field: vet?.phoneNumber },
      { textKey: 'Address: ', field: vet?.address },
    ];

    userData = userData
      .concat(addressAndVetArr)
      .filter((obj: any) => obj.textKey !== '__typename');
  }

  useEffect(() => {
    if (show)
      loadFormData({
        variables: {
          id: formId,
        },
      });
  }, [show, loadFormData, formId]);

  return (
    <Modal show={show} onHide={() => setShow(false)} centered keyboard>
      {error && <Alert>Error! ${error.message}</Alert>}
      {loading ? (
        <Wrapper
          style={{ height: '40rem' }}
          display={['flex']}
          justifyContent={['center']}
          alignitems={['center']}
        >
          <Spinner animation='border' />
        </Wrapper>
      ) : (
        <div className='flex flex-column p-5'>
          <i
            onClick={() => setShow(false)}
            className='fas fa-times d-flex justify-content-end'
          ></i>
          {userData?.map((x: { textKey: string; field: any }, i: number) => (
            <div key={i}>
              {i === 0 && (
                <Text fontSize={['1.75rem']} margin={['0.5rem 0 0 0']}>
                  Client
                </Text>
              )}
              {i === 6 && (
                <Text fontSize={['1.75rem']} margin={['0.5rem 0 0 0']}>
                  Address
                </Text>
              )}
              {i === 10 && (
                <Text fontSize={['1.75rem']} margin={['0.5rem 0 0 0']}>
                  Vet
                </Text>
              )}
              <div className='d-flex'>
                <Text display={['flex']} flex={['1']} fontWeight={['800']}>
                  {x.textKey}
                </Text>
                <Text display={['flex']} flex={['1']}>
                  {typeof x.field === 'boolean' ? (
                    x.field ? (
                      <i className='fas fa-check'></i>
                    ) : (
                      <i className='fas fa-times'></i>
                    )
                  ) : (
                    x.field
                  )}
                </Text>
              </div>
            </div>
          ))}
          <Text fontSize={['1.75rem']} margin={['0.5rem 0 0 0']}>
            Pet(s)
          </Text>
          <Wrapper
            display={['flex']}
            flexdirection={['column', 'column', 'row', 'row']}
          >
            {petsData
              ?.filter((obj: any) => obj.textKey !== '__typename')
              ?.map((x: any, i: number) => (
                <Wrapper
                  key={i}
                  style={{ flex: 1 }}
                  display={['flex']}
                  flexdirection={['column']}
                  borderBottom={[
                    '1px solid rgba(0, 0, 0, 0.075)',
                    '1px solid rgba(0, 0, 0, 0.075)',
                    'none',
                  ]}
                  padding={['0.5rem 0', '0.5rem 0', 0]}
                >
                  <div className='d-flex'>
                    <Text display={['flex']} flex={['1']} fontWeight={['800']}>
                      Name:
                    </Text>
                    <Text display={['flex']} flex={['1']}>
                      {x.name}
                    </Text>
                  </div>
                  <div className='d-flex'>
                    <Text display={['flex']} flex={['1']} fontWeight={['800']}>
                      Age:
                    </Text>
                    <Text display={['flex']} flex={['1']}>
                      {x.age}
                    </Text>
                  </div>
                  <div className='d-flex'>
                    <Text display={['flex']} flex={['1']} fontWeight={['800']}>
                      Breed:
                    </Text>
                    <Text display={['flex']} flex={['1']}>
                      {x.breedString}
                    </Text>
                  </div>
                  <div className='d-flex'>
                    <Text display={['flex']} flex={['1']} fontWeight={['800']}>
                      Free Roaming:
                    </Text>
                    <Text display={['flex']} flex={['1']}>
                      {x.freeRoaming ? (
                        <i className='fas fa-check'></i>
                      ) : (
                        <i className='fas fa-times'></i>
                      )}
                    </Text>
                  </div>
                  <div className='d-flex'>
                    <Text display={['flex']} flex={['1']} fontWeight={['800']}>
                      Good With Strangers:
                    </Text>
                    <Text display={['flex']} flex={['1']}>
                      {x.goodWithStrangers ? (
                        <i className='fas fa-check'></i>
                      ) : (
                        <i className='fas fa-times'></i>
                      )}
                    </Text>
                  </div>
                  <div className='d-flex'>
                    <Text display={['flex']} flex={['1']} fontWeight={['800']}>
                      Harness:
                    </Text>
                    <Text display={['flex']} flex={['1']}>
                      {x.harnessLocation}
                    </Text>
                  </div>
                  <div className='d-flex'>
                    <Text display={['flex']} flex={['1']} fontWeight={['800']}>
                      Is Sprayed:
                    </Text>
                    <Text display={['flex']} flex={['1']}>
                      {x.isSprayed ? (
                        <i className='fas fa-check'></i>
                      ) : (
                        <i className='fas fa-times'></i>
                      )}
                    </Text>
                  </div>
                  <div className='d-flex'>
                    <Text display={['flex']} flex={['1']} fontWeight={['800']}>
                      Medications:
                    </Text>
                    <Text display={['flex']} flex={['1']}>
                      {x.medications}
                    </Text>
                  </div>
                  <div className='d-flex'>
                    <Text display={['flex']} flex={['1']} fontWeight={['800']}>
                      Preferred Time Of Service:
                    </Text>
                    <Text display={['flex']} flex={['1']}>
                      {x.preferredTimeOfService}
                    </Text>
                  </div>
                  <div className='d-flex'>
                    <Text display={['flex']} flex={['1']} fontWeight={['800']}>
                      Sex:
                    </Text>
                    <Text display={['flex']} flex={['1']}>
                      {x.sex}
                    </Text>
                  </div>
                  <Wrapper display={['flex']}>
                    <Text display={['flex']} flex={['1']} fontWeight={['800']}>
                      Temperament:
                    </Text>
                    <Text display={['flex']} flex={['1']}>
                      {x.temperament}
                    </Text>
                  </Wrapper>
                </Wrapper>
              ))}
          </Wrapper>
        </div>
      )}
    </Modal>
  );
};
export default NewClientFormModal;
