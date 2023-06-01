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
  maxWidth?: string[];
  padding?: string[];
  cursor?: string[];
  position?: string[];
  transform?: string[];
  borderBottom?: string[];
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
    maxWidth: '',
    padding: '',
    cursor: '',
    position: 'relative',
    transform: '',
    borderBottom: '',
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
    maxWidth,
    padding,
    cursor,
    position,
    transform,
    borderBottom,
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
      {
        property: 'max-width',
        values: maxWidth,
      },
      {
        property: 'padding',
        values: padding,
      },
      {
        property: 'cursor',
        values: cursor,
      },
      {
        property: 'position',
        values: position,
      },
      {
        property: 'transform',
        values: transform,
      },
      {
        property: 'border-bottom',
        values: borderBottom,
      },
    ]),
  })
);

export default Flex;
