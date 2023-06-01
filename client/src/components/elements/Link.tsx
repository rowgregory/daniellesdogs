import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { createMediaQueries } from '../../utils/createMediaQueries';

interface LinkProps {
  fontSize?: string[];
  color?: any;
  fontFamily?: string;
  padding?: string[] | string;
  margin?: string[];
  position?: string[];
  display?: string[];
  textDecoration?: string[];
  width?: string[];
  alignitems?: string[];
  fontWeight?: string[];
}

const Link = styled(RouterLink)<LinkProps>(
  {
    fontSize: '1rem',
    color: 'black',
    fontFamily: 'Cormorant, serif',
    padding: '',
    margin: '',
    position: 'relative',
    display: '',
    textDecoration: 'none',
    width: 'fit-content',
    alignitems: '',
    fontWeight: '',
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
    alignitems,
    fontWeight,
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
        property: 'align-items',
        values: alignitems,
      },
      {
        property: 'font-weight',
        values: fontWeight,
      },
    ]),
  })
);

export default Link;
