import styled from 'styled-components';
import { createMediaQueries } from '../../utils/createMediaQueries';

const Wrapper = styled.div<{
  maxWidth?: any;
  width?: any;
  justifyContent?: any;
  display?: any;
  alignitems?: any;
  flexdirection?: any;
  borderBottom?: any;
  paddingBottom?: any;
  padding?: any;
}>(
  {
    maxWidth: '',
    width: '100%',
    justifyContent: '',
    display: '',
    alignitems: '',
    flexdirection: undefined,
    borderBottom: '',
    paddingBottom: '',
    padding: '',
  },
  ({
    maxWidth,
    width,
    justifyContent,
    display,
    alignitems,
    flexdirection,
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
        values: alignitems,
      },
      {
        property: 'flex-direction',
        values: flexdirection,
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
