/* eslint-disable no-undef, react/prop-types */
import React from 'react';
import { graphql } from 'gatsby';
import styled, { css } from 'react-emotion';
import { width, textAlign, space } from 'styled-system';
import { Box, Flex } from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import colors from '../utils/colors';
import feather from '../utils/feather';
import media from '../utils/media';

const svgStyles = css`
  opacity: 0.5;
  transition: opacity 0.15s ease-in;
  transition: color 0.15s ease-in;

  &:hover {
    text-decoration: none;
    box-shadow: none;
    opacity: 1;
    transition: opacity 0.15s ease-in;
  }
`;

const ulStyle = css`
  list-style-type: none;
  margin: 0;
  margin-bottom: 1.45rem;
  padding: 0;
  text-align: center;
  & a {
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 0.15s ease-in;
    transition: color 0.15s ease-in;

    &:hover {
      text-decoration: none;
      box-shadow: none;
      opacity: 1;
      transition: opacity 0.15s ease-in;
    }
  }
  & li {
    margin: 0.5rem 0;
    & i {
      margin-right: 0.5rem;
    }
  }
`;

const Heading1 = styled.h1`
  ${space} ${textAlign} ${width};
`;

const Heading2 = styled.h2`
    ${space} ${textAlign} ${width};
`;

const Li = styled.li`
  padding: 0 1rem;
  ${space} ${textAlign};
  transition: font-size 0.2s ease-in;
  &:hover {
    font-size: 26px;
    transition: font-size 0.2s ease-in;
  }
`;

const contactWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1;
  align-items: flex-start;
`;

const flexContainer = css`
  box-shadow: -10px -10px 20px rgba(0, 0, 0, 0.8);
  ${media.mid`
    box-shadow: none;
  `};  
`;

const Contact = ({ data }) => {
  const {
    sentence,
    city,
    email,
    phone
  } = data.allContentJson.edges[0].node.contact;
  return (
    <PageWrapper>
      <Box
        className={contactWrapper}
        bg={colors.primary}
        width={['100vw', '100vw', '100vw']}
        maxWidth={['100%', '100%', '100%']}
        m="0 auto"
        px={[2, 3, 6]}
        py={[2, 3, 4]}
        align="left"
        color="white"
      >
        <Flex
          className={flexContainer}
          width="100vw"
          wrap={['wrap', 'wrap', 'wrap']}
          justifyContent=""
        >
          <Heading1 width={[1, 1, 1]} textAlign="center">
            Contact
          </Heading1>
          <Box
            width={[1, 1, 1]}
            textAlign="center"
            m={['0', '0', '0']}
            px={['10%', '20%', '30%']}
            color={colors.secondary}
          >
            <Heading2>{sentence}</Heading2>
            <ul className={ulStyle}>
              <Li>
                {feather('map-pin', ['25', '25'], svgStyles)} {city}
              </Li>
              <Li>
                {feather('mail', ['25', '25'], svgStyles)} {email}
              </Li>
              <Li>
                {feather('phone', ['25', '25'], svgStyles)} {phone}
              </Li>
            </ul>
          </Box>
        </Flex>
      </Box>
    </PageWrapper>
  );
};

export const query = graphql`
  query {
    allContentJson {
      edges {
        node {
          contact {
            sentence
            city
            email
            phone
          }
        }
      }
    }
  }
`;

export default Contact;
