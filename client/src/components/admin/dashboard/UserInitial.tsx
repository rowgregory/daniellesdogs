import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { UserInitials } from './RightPanel';
import { Flex, Text } from '../../elements';

const UserInitial = () => {
  const context = useContext(AuthContext);
  const firstInitial = context?.user?.firstName?.charAt(0);
  const lastInitial = context?.user?.lastName?.charAt(0);

  const nyTime = new Date(context?.user?.lastLoginTime).toLocaleString(
    'en-US',
    {
      timeZone: 'America/New_York',
    }
  );

  return (
    <div className='d-flex align-items-center'>
      <UserInitials>
        {firstInitial}
        {lastInitial}
      </UserInitials>
      <Flex flexdirection={['column']}>
        <Text fontFamily='Roboto' color='#999ea4'>
          {context?.user?.firstName}
        </Text>
        <Text fontFamily='Roboto' fontSize={['10px']} color='#999ea4'>
          Last login time:{' '}
          {nyTime === 'Invalid Date'
            ? 'Welcome! This is your first time logging in.'
            : nyTime}
        </Text>
      </Flex>
    </div>
  );
};

export default UserInitial;
