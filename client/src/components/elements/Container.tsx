import styled from 'styled-components';
import { createMediaQueries } from '../../utils/createMediaQueries';

const Container = styled.div<{ backgroundColor?: any }>(
  {
    backgroundColor: '#121212',
  },
  ({ backgroundColor }) => ({
    ...createMediaQueries([
      {
        property: 'background-color',
        values: backgroundColor,
      },
    ]),
  })
);

export default Container;
