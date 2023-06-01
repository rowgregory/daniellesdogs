import { Image } from 'react-bootstrap';
import styled from 'styled-components';
import { createMediaQueries } from '../../utils/createMediaQueries';

interface ImageProps {
  color?: any;
  padding?: string[] | string;
  margin?: string[];
  position?: string[];
  display?: string[];
  width?: string[] | any;
  maxwidth?: string[] | any;
  flex?: string[];
  cursor?: string;
  background?: string[];
  transform?: string[];
  objectfit?: string[];
  aspectratio?: string[];
  gridarea?: string[];
  borderradius?: string[];
  height?: string;
}

const Picture = styled(Image)<ImageProps>(
  {
    color: 'black',
    padding: '',
    margin: '',
    position: 'relative',
    display: '',
    width: 'fit-content',
    maxwidth: '',
    flex: '',
    cusros: '',
    background: '',
    lineHeight: '',
    transform: '',
    objectfit: 'cover',
    aspectratio: '',
    gridarea: '',
    borderradius: '',
    height: '',
  },
  ({
    color,
    padding,
    margin,
    position,
    display,
    width,
    maxwidth,
    flex,
    cursor,
    background,
    transform,
    objectfit,
    aspectratio,
    gridarea,
    borderradius,
    height,
  }) => ({
    ...createMediaQueries([
      {
        property: 'color',
        values: color,
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
        property: 'width',
        values: width,
      },
      {
        property: 'max-width',
        values: maxwidth,
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
        property: 'transform',
        values: transform,
      },
      {
        property: 'object-fit',
        values: objectfit,
      },
      {
        property: 'aspect-ratio',
        values: aspectratio,
      },
      {
        property: 'grid-area',
        values: gridarea,
      },
      {
        property: 'border-radius',
        values: borderradius,
      },
      {
        property: 'height',
        values: height,
      },
    ]),
  })
);

export default Picture;
