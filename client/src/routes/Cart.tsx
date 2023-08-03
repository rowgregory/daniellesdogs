// import { useContext, useEffect, useState } from 'react';
import {
  // BurgerWrapper,
  Container,
  // InnerWrapper,
  // Line,
  // TitleText,
  // Wrapper,
} from '../components/cart/styles';
// import CartTable from '../components/cart/CartTable';
// import CheckoutBar from '../components/cart/CheckoutBar';
// import { NavbarContext } from '../context/navbarContext';

const Cart = () => {
  // const { setShowSideBar, showSideBar } = useContext(NavbarContext);
  // const [height, setChangeHeight] = useState(false);

  // useEffect(() => {
  //   const addScrollbar = () =>
  //     window.innerHeight < 777 ? setChangeHeight(true) : setChangeHeight(false);

  //   addScrollbar();

  //   const handleResize = () => {
  //     addScrollbar();
  //   };

  //   window.addEventListener('resize', handleResize);

  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  return (
    <Container>
      {/* <BurgerWrapper onClick={() => setShowSideBar(!showSideBar)}>
        <i
          className='fas fa-bars'
          style={{ color: showSideBar ? '#fff' : '#121212' }}
        ></i>
      </BurgerWrapper>
      <Wrapper>
        <InnerWrapper>
          <TitleText>Shopping Cart</TitleText>
          <Line />
          <CartTable height={height} />
        </InnerWrapper>
      </Wrapper>
      <CheckoutBar /> */}
    </Container>
  );
};

export default Cart;
