/* eslint-disable */
import React from 'react';
import Link from 'gatsby-link';
import styled, { css } from 'react-emotion';
import { Flex } from '../Layout';
import media from '../../utils/media';
import colors from '../../utils/colors';

const subcategoriesContainer = css`
  justify-content: center;
  ${media.small`
    border-bottom: 1px solid ${colors.secondary}
  `}; 
`;

const Ul = styled.ul`
  display: flex;
  color: ${colors.secondary};
  font-weight: 700;
  padding: 0;
  height: 3rem;
  ${media.small`
    flex-flow: column;
    height: auto;
  `};  
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  font-size: 24px;
  transition: font-size 0.15s ease-in;
  &:hover, &:active {
    text-decoration: none;
    font-size: 28px;
    transition: font-size 0.15s ease-in;
    ${media.small`
      transition: none;
    `};     
  }  
  ${media.small`
    padding: 0.3rem 0;
    transition: none;
  `};   
`;


const SubNavigation = ({categories, width}) => (
  <Flex
    width={width}
    flexDirection="row"
    wrap={['wrap', 'wrap', 'wrap']}
    alignItems="center"
    className={subcategoriesContainer}
  >
    <Ul>
      {categories.map(({ node: category }, index) => (
        <Li>
          <Link to={`/blog/categories/${category.slug}`}>
            {`__${category.name}`}
          </Link>
        </Li>
      ))}
    </Ul>
  </Flex>
);

export default SubNavigation;
