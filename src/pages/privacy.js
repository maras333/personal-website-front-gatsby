/* eslint-disable no-undef, react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'react-emotion';
import { width, textAlign, space, zIndex } from 'styled-system';
import { Box, Flex } from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import ConstellationCanvas from '../components/Canvas';
import colors from '../utils/colors';
import media from '../utils/media';
import SEO from '../components/SEO';

const policyWrapper = css`
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

const Heading1 = styled.h1`
  ${space} ${textAlign} ${width} ${zIndex};
`;

const Privacy = () => {
  const [elHeight, setElHeight] = useState(0);
  const [elWidth, setElWidth] = useState(0);
  const flexEl = useRef();

  useEffect(() => {
    setElHeight(flexEl.current.clientHeight);
    setElWidth(flexEl.current.clientWidth);
  }, []);
  return (
    <>
      <SEO title="Privacy" pathname="/privacy" article={false} />
      <PageWrapper>
        <Box
          className={policyWrapper}
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
              Privacy Policy
            </Heading1>
            <Box
              width={[1, 1, 1]}
              m={[0, '2rem 0 0 0', '2rem 0 0 0']}
              px={[3, 3, 4]}
              color={colors.secondary}
              zIndex={1}
            >
              <p>
                This site contains information on data processing and cookie usage related to visiting <b>www.marekczyz.xyz</b> website.
              </p>
              <p>
                <b>Information I collect</b>
              </p>
              <p>
                <b>Analytics data</b>
                <br />
                This website uses Google Analytics service (provided by Google
                LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) to
                gather some statistics about your visits here and optimize the
                site. Statistics are gathered automatically during your visit
                here. Such data usage is my legitimate interest.
              </p>
              <p>
                Google Analytics gathers data about:
                <ul>
                  <li>how you get to the site (from what website)</li>
                  <li>sites you visited during your stay here</li>
                  <li>duration of your visit</li>
                  <li>where do you come from</li>
                  <li>some other similar kinds of data</li>
                </ul>
              </p>
              <p>
                I use these statistics to know what kind of people visit my
                site. With such information I can better adjust website design
                and content for the majority of the audience. Gathering
                information does not let me identify you personally. Those
                identifiers allow Google Analytics to count unique users that
                visit this website.
              </p>
              <p>
                Google is a US based company and stores gathered data in the US.
                In order to assure proper personal data protection level for EU
                citizens it is a part of the EU-US-Privacy Shield program.
                European Commission assures that companies with Privacy Shield
                certificates have proper data protection levels.
              </p>
              <p>Your data will be stored in Google Analytics for 26 months.</p>
            </Box>
          </Flex>
        </Box>
      </PageWrapper>
    </>
  );
};

export default Privacy;
