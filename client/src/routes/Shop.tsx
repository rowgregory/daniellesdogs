import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Text } from '../components/elements';

const Container = styled.div`
  /* background: radial-gradient(
    ellipse at 11% 5%,
    #fffba5 0%,
    #fffba5 6%,
    #67ff9e 12%,
    #cfd8d9 21%,
    #cfd8d9 100%
  ); */
  height: 100vh;
  /* margin-top: 128px; */
`;

const Shop = () => {
  useEffect(() => {
    document.title = 'Shop';
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.25 }}
      transition={{ duration: 0.5 }}
    >
      <Container>
        <Text>Shop</Text>
      </Container>
    </motion.div>
  );
};

export default Shop;
