/* eslint-disable no-undef, react/prop-types */
import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled, { css } from 'react-emotion';
import { width, textAlign, space, fontWeight, fontSize } from 'styled-system';
import { Box, Flex } from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import colors from '../utils/colors';
import media from '../utils/media';

const imgStyle = css`
  border-radius: 33%;
  box-shadow: -10px -10px 20px rgba(0, 0, 0, 0.8);
`;

const Heading1 = styled.h1`
  ${space} ${textAlign} ${width};
  `;

const Heading2 = styled.h2`
    ${space} ${textAlign} ${width};
  `;

const DL = styled.dl`
  ${space} ${textAlign} ${width};
`;

const DT = styled.dt`
  ${space} ${textAlign} ${width} ${fontWeight} ${fontSize};
`;

const DD = styled.dd`
  ${space} ${textAlign} ${width} ${fontWeight} ${fontSize};
`;

const aboutWrapper = css`
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
  align-items: flex-start;
`;

const About = ({ data }) => {
  const imageData = data.file.childImageSharp;
  const { description, skills } = data.allContentJson.edges[0].node.about;
  return (
    <PageWrapper>
      <Box
        className={aboutWrapper}
        bg={colors.primary}
        width={['100vw', '100vw', '100vw']}
        maxWidth={['100%', '100%', '100%']}
        m="0 auto"
        px={[2, 3, 6]}
        py={[2, 3, 4]}
        align="left"
        color="white"
      >
        <Flex className={flexContainer} width="100ww" wrap={['wrap', 'wrap', 'wrap']} justifyContent="">
          <Heading1 width={[1, 1, 1]} textAlign="center">
            About Me
          </Heading1>
          <Box
            width={[1, 1, 1 / 4]}
            m={[0, '2rem 0 0 0', '2rem 0 0 0']}
            px={[5, 5, 5]}
            py={[3, 5, 5]}
            color={colors.secondary}
          >
            <Img
              className={imgStyle}
              alt="Picture of me"
              fluid={imageData.fluid}
            />
          </Box>
          <Box
            width={[1, 1, 3 / 8]}
            m={['2rem 0 0 0', '2rem 0 0 0', '2rem 0 0 0']}
            px={[3, 3, 4]}
            color={colors.secondary}
          >
            <Heading2 my={[0, 0, 0]}>{description.intro}</Heading2>
            <div dangerouslySetInnerHTML={{ __html: description.full }} />
          </Box>
          <Box
            width={[1, 1, 3 / 8]}
            m={['2rem 0 0 0', '2rem 0 0 0', '2rem 0 0 0']}
            px={[3, 3, 4]}
            color={colors.secondary}
          >
            <Heading2 my={[0, 0, 0]}>{description.whatIDo}</Heading2>
            <DL>
              {skills.map(({ type, tools }) => (
                <div>
                  <DT
                    m={['1rem 0 0 0', '1rem 0 0 0', '1rem 0 0 0']}
                    fontSize={['20px', '20px', '20px']}
                    fontWeight={700}
                  >
                    {type}
                  </DT>
                  <DD fontSize={['18px', '18px', '18px']}>{tools}</DD>
                </div>
              ))}
            </DL>
          </Box>
        </Flex>
      </Box>
    </PageWrapper>
  );
};

export const query = graphql`
  query {
    file(relativePath: { eq: "id.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 100, grayscale: true) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allContentJson {
      edges {
        node {
          about {
            description {
              full
              intro
              whatIDo
            }
            skills {
              tools
              type
            }
          }
        }
      }
    }
  }
`;

export default About;
