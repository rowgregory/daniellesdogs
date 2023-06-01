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
  texttransform?: string;
  bottom?: string;
  right?: string[];
  transition?: string;
  maxWidth?: string[];
  alignSelf?: string[];
  textShadow?: string[];
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
    cursor: '',
    background: '',
    lineHeight: '',
    textAlign: undefined,
    texttransform: '',
    bottom: '',
    right: '',
    transition: '',
    maxWidth: '',
    alignSelf: '',
    textShadow: '',
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
    texttransform,
    bottom,
    right,
    transition,
    maxWidth,
    alignSelf,
    textShadow,
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
      {
        property: 'text-transform',
        values: texttransform,
      },
      {
        property: 'bottom',
        values: bottom,
      },
      {
        property: 'right',
        values: right,
      },
      {
        property: 'transition',
        values: transition,
      },
      {
        property: 'max-width',
        values: maxWidth,
      },
      {
        property: 'align-self',
        values: alignSelf,
      },
      {
        property: 'text-shadow',
        values: textShadow,
      },
    ]),
  })
);

export default Text;
