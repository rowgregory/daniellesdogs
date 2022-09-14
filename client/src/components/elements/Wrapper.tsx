import styled from 'styled-components';
import { createMediaQueries } from '../../utils/createMediaQueries';

const Wrapper = styled.div<{
  maxWidth?: any;
  width?: any;
  justifyContent?: any;
  display?: any;
  alignItems?: any;
  flexDirection?: any;
  borderBottom?: any;
  paddingBottom?: any;
  padding?: any;
}>(
  {
    maxWidth: '',
    width: '100%',
    justifyContent: '',
    display: '',
    alignItems: '',
    flexDirection: undefined,
    borderBottom: '',
    paddingBottom: '',
    padding: '',
  },
  ({
    maxWidth,
    width,
    justifyContent,
    display,
    alignItems,
    flexDirection,
    borderBottom,
    paddingBottom,
    padding,
  }) => ({
    ...createMediaQueries([
      {
        property: 'max-width',
        values: maxWidth,
      },
      {
        property: 'width',
        values: width,
      },
      {
        property: 'justify-content',
        values: justifyContent,
      },
      {
        property: 'display',
        values: display,
      },
      {
        property: 'align-items',
        values: alignItems,
      },
      {
        property: 'flex-direction',
        values: flexDirection,
      },
      {
        property: 'border-bottom',
        values: borderBottom,
      },
      {
        property: 'padding-bottom',
        values: paddingBottom,
      },
      {
        property: 'padding',
        values: padding,
      },
    ]),
  })
);

export default Wrapper;
