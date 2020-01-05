/* eslint-disable no-undef, react/prop-types */
import React from 'react';
import { Link, graphql } from 'gatsby';
import styled, { css } from 'react-emotion';
import { space } from 'styled-system';
import { Box, Flex } from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import StyledBackgroundSection from '../components/Layout/backgroundSection';
import colors from '../utils/colors';
import { ButtonSecondary } from '../components/Buttons';

const Wrapper = styled.div`
  width: 100%;
  margin: 0;
  text-align: center;
  ${space};
`;

const Heading3 = styled.h3`
  line-height: 1.5;
`;

export default ({ data }) => {
  const myData = data.allContentJson.edges[0].node.index;
  return (
    <PageWrapper>
      <StyledBackgroundSection>
        <div>
          <Box>
            <Box
              maxWidth={['100%', '100%', '85%']}
              m="0 auto"
              p={[2, 3, 4]}
              color={colors.secondary}
              textAlign="center"
            >
              <Wrapper px={[0, 0, '25%']}>
                <h1>{myData.title}</h1>
                <div>
                  <Heading3>{myData.subtitle}</Heading3>
                </div>
              </Wrapper>
              <Flex justifyContent="center" wrap={['wrap', 'wrap', 'nowrap']}>
                <Box m={[1]} width={[1, 1 / 2, 1 / 4]}>
                  <Link to="/about">
                    <ButtonSecondary>About Me</ButtonSecondary>
                  </Link>
                </Box>
                <Box m={[1]} width={[1, 1 / 2, 1 / 4]}>
                  <Link to="/blog">
                    <ButtonSecondary>Blog</ButtonSecondary>
                  </Link>
                </Box>
              </Flex>
            </Box>
          </Box>
          <Box py={[3, 3, 5]}>
            <Box
              maxWidth={['100%', '100%', '60%']}
              m="0 auto"
              px={[3, 3, 3]}
              color={colors.secondary}
              overflow="visible"
            >
              <Flex justifyContent="center" wrap={['wrap', 'wrap', 'wrap']}>
                <Box
                  p={['1rem', '2rem', '2rem 1rem']}
                  width={[1, 1 / 2, 1 / 3]}
                  textAlign="center"
                  transform={['auto', 'auto', 'rotate(45deg)']}
                  fontSize={['22px', '24px', '26px']}
                >
                  <span>
                    <b>#PROGRAMMING</b>
                  </span>
                </Box>
                <Box
                  p={['1rem', '2rem', '2rem 1rem']}
                  width={[1, 1 / 2, 1 / 3]}
                  textAlign="center"
                  transform={['auto', 'auto', 'rotate(45deg)']}
                  fontSize={['22px', '24px', '26px']}
                >
                  <span>
                    <b>#CYCLING</b>
                  </span>
                </Box>
                <Box
                  p={['1rem', '2rem', '2rem 1rem']}
                  width={[1, 1 / 2, 1 / 3]}
                  textAlign="center"
                  transform={['auto', 'auto', 'rotate(45deg)']}
                  fontSize={['22px', '24px', '26px']}
                >
                  <span>
                    <b>#THINKING</b>
                  </span>
                </Box>
                <Box
                  p={['1rem', '2rem', '2rem 1rem']}
                  width={[1, 1 / 2, 1 / 3]}
                  textAlign="center"
                  transform={['auto', 'auto', 'rotate(-45deg)']}
                  fontSize={['22px', '24px', '26px']}
                >
                  <span>
                    <b>#CREATING</b>
                  </span>
                </Box>
                <Box
                  p={['1rem', '2rem', '2rem 1rem']}
                  width={[1, 1 / 2, 1 / 3]}
                  textAlign="center"
                  transform={['auto', 'auto', 'rotate(-45deg)']}
                  fontSize={['22px', '24px', '26px']}
                >
                  <span>
                    <b>#EVERYTHING</b>
                  </span>
                </Box>
              </Flex>
            </Box>
          </Box>
        </div>
      </StyledBackgroundSection>
    </PageWrapper>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    allContentJson {
      edges {
        node {
          index {
            title
            subtitle
          }
        }
      }
    }
  }
`;
