/* eslint-disable no-undef, react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'react-emotion';
import { width, textAlign, space, zIndex } from 'styled-system';
import Link from 'gatsby-link';
import { Box, Flex } from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import ConstellationCanvas from '../components/Canvas';
import colors from '../utils/colors';
import media from '../utils/media';
import SEO from '../components/SEO';

const termsWrapper = css`
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
  align-items: flex-start;
  position: relative;
  overflow: hidden;
`;

const linkStyle = css`
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
`;

const Heading1 = styled.h1`
  ${space} ${textAlign} ${width} ${zIndex};
`;

const Terms = () => {
  const [elHeight, setElHeight] = useState(0);
  const [elWidth, setElWidth] = useState(0);
  const flexEl = useRef();

  useEffect(() => {
    setElHeight(flexEl.current.clientHeight);
    setElWidth(flexEl.current.clientWidth);
  }, []);
  return (
    <>
      <SEO title="Terms" pathname="/terms" article={false} />
      <PageWrapper>
        <Box
          className={termsWrapper}
          bg={colors.primary}
          width={['100vw', '100vw', '100vw']}
          maxWidth={['100%', '100%', '100%']}
          m="0 auto"
          px={[2, 3, 6]}
          py={[2, 3, 5]}
          align="left"
          color="white"
        >
          <Flex
            className={flexContainer}
            width="100vw"
            wrap={['wrap', 'wrap', 'wrap']}
            innerRef={flexEl}
          >
            <ConstellationCanvas width={elWidth} height={elHeight} />
            <Heading1 width={[1, 1, 1]} textAlign="center" zIndex={1}>
              Terms of Service
            </Heading1>
            <Box
              width={[1, 1, 1]}
              m={[0, '2rem 0 0 0', '2rem 0 0 0']}
              px={[3, 3, 4]}
              color={colors.secondary}
              zIndex={1}
            >
              <p>
                Welcome to <b>One revolution more!</b>
              </p>

              <p>
                These terms and conditions outline the rules and regulations for
                the use of EM51 Maras Production's Website, located at
                https://www.marekczyz.xyz/.
              </p>

              <p>
                By accessing this website I assume you accept these terms and
                conditions. Do not continue to use One revolution more! if you
                do not agree to take all of the terms and conditions stated on
                this page.
              </p>

              <p>
                <b>Cookies</b>
                <br />I employ the use of cookies. By accessing One revolution
                more!, you agreed to use cookies in agreement with the EM51
                Maras Production's Privacy Policy
              </p>

              <p>
                <b>License</b>
                <br />
                Unless otherwise stated, EM51 Maras and/or its licensors own the
                intellectual property rights for all material on One revolution
                more. All intellectual property rights are reserved. You may
                access this from One revolution more! for your own personal use
                subjected to restrictions set in these terms and conditions.
              </p>

              <p>You must not:</p>
              <ul>
                <li>
                  Sell, rent or sub-license material from One revolution more!
                </li>
              </ul>

              <p>
                <b>Your Privacy</b>
                <br />
                Please read{' '}
                <Link className={linkStyle} to="/privacy">
                  Privacy policy
                </Link>
              </p>

              <p>
                <b>Disclaimer</b> <br />
                As long as the website and the information and services on the
                website are provided free of charge, I will not be liable for
                any loss or damage of any nature.
              </p>
            </Box>
          </Flex>
        </Box>
      </PageWrapper>
    </>
  );
};

export default Terms;
