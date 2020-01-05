/* eslint-disable no-undef, react/prop-types */
import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'react-emotion';
import { width, textAlign, space } from 'styled-system';
import { Box, Flex } from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import { ButtonSecondary } from '../components/Buttons';
import colors from '../utils/colors';
import media from '../utils/media';

const Heading1 = styled.h1`
  ${space} ${textAlign} ${width};
`;

const Heading2 = styled.h2`
    ${space} ${textAlign} ${width};
`;

const page404Wrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1;
`;

const flexContainer = css`
  box-shadow: -10px -10px 20px rgba(0, 0, 0, 0.8);
  ${media.mid`
    box-shadow: none;
  `};
  flex-direction: column;
  align-items: flex-start;
`;

const Page404 = () => (
  <PageWrapper>
    <Box
      className={page404Wrapper}
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
      >
        <Heading1 width={[1, 1, 1]} textAlign="center">
          404
        </Heading1>
        <Heading2 width={[1, 1, 1]} textAlign="center">
          Page not exists:(
        </Heading2>
        <Box m="0 auto" py={[4, 4, 4]} textAlign="center">
          <Link to="/">
            <ButtonSecondary fontSize="24px">
              <span>Go to HomePage</span>
            </ButtonSecondary>
          </Link>
        </Box>
      </Flex>
    </Box>
  </PageWrapper>
);

export default Page404;
