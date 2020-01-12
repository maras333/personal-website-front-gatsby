import styled from 'react-emotion';
import {
  space,
  width,
  maxWidth,
  fontSize,
  color,
  textAlign,
  overflow,
  justifyContent,
  flexDirection,
  alignItems,
  style,
  height,
  zIndex
} from 'styled-system';

const wrap = style({
  prop: 'wrap',
  cssProperty: 'flexWrap'
});

const transform = style({
  prop: 'transform',
  cssProperty: 'transform'
});

export const Box = styled.div`
  overflow: hidden;
  ${space} ${width} ${maxWidth} ${fontSize} ${color} ${textAlign} ${height} ${transform} ${overflow} ${zIndex};
`;

export const Flex = styled.div`
  display: flex;
  ${flexDirection} ${alignItems} ${justifyContent} ${wrap} ${width};
`;
