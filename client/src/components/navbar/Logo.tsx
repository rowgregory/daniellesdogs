import styled from 'styled-components';
import { Link, Text } from '../elements';
import { DDLogo } from '../svg/Logo';

const LogoAndText = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Logo = () => {
  const animations = {
    changeColor: '#fff',
  };

  return (
    <LogoAndText to='/'>
      <DDLogo w='22pt' h='22pt' fill={animations.changeColor} />
      <Text
        transition='300ms'
        margin={['0 0 0 8px']}
        fontSize={['28px']}
        fontFamily={`Italianno, cursive`}
        color={animations.changeColor}
      >
        Danielle's Dogs
      </Text>
    </LogoAndText>
  );
};

export default Logo;
