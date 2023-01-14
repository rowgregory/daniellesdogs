import styled from 'styled-components';
import { createMediaQueries } from '../../utils/createMediaQueries';

interface FlexProps {
  display?: string[];
  flexDirection?: string[];
  justifyContent?: string[];
  alignItems?: string[];
  flexWrap?: string[];
  flex?: string[];
  margin?: string[];
  width?: string[];
}

const Flex = styled.div<FlexProps>(
  {
    display: 'flex',
    flexDirection: undefined,
    justifyContent: '',
    alignItems: '',
    flexWrap: undefined,
    flex: '',
    margin: '',
    width: '',
  },
  ({
    display,
    flexDirection,
    justifyContent,
    alignItems,
    flex,
    flexWrap,
    margin,
    width,
  }) => ({
    ...createMediaQueries([
      {
        property: 'display',
        values: display,
      },
      {
        property: 'flex-direction',
        values: flexDirection,
      },
      {
        property: 'justify-content',
        values: justifyContent,
      },
      {
        property: 'align-items',
        values: alignItems,
      },
      {
        property: 'flex-wrap',
        values: flexWrap,
      },
      {
        property: 'flex',
        values: flex,
      },
      {
        property: 'margin',
        values: margin,
      },
      {
        property: 'width',
        values: width,
      },
    ]),
  })
);

export default Flex;
