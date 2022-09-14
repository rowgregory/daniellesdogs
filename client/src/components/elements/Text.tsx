import styled from 'styled-components';
import { createMediaQueries } from '../../utils/createMediaQueries';

interface TextProps {
  fontSize?: string[];
  color?: any;
  fontFamily?: string;
  padding?: string[] | string;
  margin?: string[];
  position?: string[];
  display?: string[];
  textDecoration?: string[];
  width?: string[];
  fontWeight?: string[];
  flex?: string[];
  cursor?: string;
  background?: string[];
  lineHeight?: string[];
  textAlign?: string[];
}

const Text = styled.div<TextProps>(
  {
    fontSize: '1rem',
    color: '#414042',
    fontFamily: 'Cormorant, serif',
    padding: '',
    margin: '',
    position: 'relative',
    display: '',
    textDecoration: 'none',
    width: 'fit-content',
    fontWeight: '',
    flex: '',
    cusros: '',
    background: '',
    lineHeight: '',
    textAlign: undefined,
  },
  ({
    fontSize,
    color,
    fontFamily,
    padding,
    margin,
    position,
    display,
    textDecoration,
    width,
    fontWeight,
    flex,
    cursor,
    background,
    lineHeight,
    textAlign,
  }) => ({
    ...createMediaQueries([
      {
        property: 'font-size',
        values: fontSize,
      },
      {
        property: 'color',
        values: color,
      },
      {
        property: 'font-family',
        values: fontFamily,
      },
      {
        property: 'padding',
        values: padding,
      },
      {
        property: 'margin',
        values: margin,
      },
      {
        property: 'position',
        values: position,
      },
      {
        property: 'display',
        values: display,
      },
      {
        property: 'text-decoration',
        values: textDecoration,
      },
      {
        property: 'width',
        values: width,
      },
      {
        property: 'font-weight',
        values: fontWeight,
      },
      {
        property: 'flex',
        values: flex,
      },
      {
        property: 'cursor',
        values: cursor,
      },
      {
        property: 'background',
        values: background,
      },
      {
        property: 'line-height',
        values: lineHeight,
      },
      {
        property: 'text-align',
        values: textAlign,
      },
    ]),
  })
);

export default Text;
