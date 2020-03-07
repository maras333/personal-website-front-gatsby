/* eslint-disable no-undef, react/prop-types */
import React from 'react';
import styled, { css } from 'react-emotion';
import { width, textAlign, space } from 'styled-system';
import { Box } from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import colors from '../utils/colors';
import SEO from '../components/SEO';

const policyWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1;
  align-items: flex-start;
`;

const Heading1 = styled.h1`
  ${space} ${textAlign} ${width};
`;

const Privacy = () => (
  <>
    <SEO title="Privacy" pathname="/privacy" article={false} />
    <PageWrapper>
      <Box className={policyWrapper} bg={colors.primary}>
        <Box
          width={[1, 1, 3 / 5]}
          m="0 auto"
          px={[2, 3, 6]}
          py={[2, 3, 4]}
          color={colors.secondary}
        >
          <Heading1 textAlign="center">Privacy Policy</Heading1>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
        </Box>
      </Box>
    </PageWrapper>
  </>
);

export default Privacy;
