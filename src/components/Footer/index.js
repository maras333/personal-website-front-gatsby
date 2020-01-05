import React from 'react';
import styled, { css } from 'react-emotion';
import { space } from 'styled-system';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import { Box, Flex } from '../Layout';
import feather from '../../utils/feather';
import media from '../../utils/media';

const footerStyle = css`
  overflow: hidden;
  padding: 2rem 0;
  background-color: ${colors.accent};
  color: rgba(255, 255, 255, 0.5);
  text-align: center;

  & img {
    display: block;
    margin: 0;
  }
  & p {
    color: rgba(255, 255, 255, 0.5);
  }
  ${media.mid`
      padding 1rem 0;
  `}
  ${media.small`
      padding 1rem 0;
  `}
`;

const ulStyle = css`
  list-style-type: none;
  margin: 0;
  margin-bottom: 1.45rem;
  text-transform: uppercase;
  padding: 0;
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
    margin: 0;
  }
  ${media.mid`
    text-align: center;
  `};
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 0;
  text-align: center;
  & p {
    margin: 0;
    margin-bottom: 1.45rem;
  }
`;

const socialList = css`
  display: flex;
  justify-content: flex-end;
  flex-flow: row wrap;
  list-style-type: none;
  margin: 0;
  padding: 0;
  ${media.large`
    width: 100%;
    margin-left: auto;
  `};
  ${media.mid`
    justify-content: center;
  `};
  ${media.small`
    justify-content: center;
  `};
`;

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

const Li = styled.li`
  padding: 0 1rem;
  ${space};
`;

// eslint-disable-next-line prettier/prettier
const Footer = ({ name, linkedin, github, facebook, instagram, email }) => (
  <div className={footerStyle}>
    <Box
      maxWidth="1200px"
      m="0 auto"
      p={[3, 3, 4, 0]}
      align="left"
      color="white"
    >
      <Flex wrap={['wrap', 'wrap', 'nowrap']} justifyContent="space-between">
        <Box width={[1, 1, 1 / 3]}>
          <Wrapper>
            <ul className={ulStyle}>
              <Li px={[0, 0, 1]}>
                <Link to="/about">{name}</Link>
              </Li>
            </ul>
          </Wrapper>
        </Box>
        <Box width={[1, 1, 1 / 3]}>
          <Wrapper>
            <ul className={ulStyle}>
              <Li px={[0, 0, 1]}>
                <Link to="/">Home</Link>
              </Li>
              <Li px={[0, 0, 1]}>
                <Link to="/privacy">Privacy Policy</Link>
              </Li>
              <Li px={[0, 0, 1]}>
                <Link to="/terms">Terms of Service</Link>
              </Li>
            </ul>
          </Wrapper>
        </Box>
        <Box width={[1, 1, 1 / 3]}>
          <Wrapper>
            <ul className={socialList}>
              <Li px="1rem">
                <a
                  title="Link to my Linkedin account"
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {feather('linkedin', ['30', '30'], svgStyles)}
                </a>
              </Li>
              <Li>
                <a
                  title="Link to my Github"
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {feather('github', ['30', '30'], svgStyles)}
                </a>
              </Li>
              <Li>
                <a
                  title="Link to my Facebook page"
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {feather('facebook', ['30', '30'], svgStyles)}
                </a>
              </Li>
              <Li>
                <a
                  title="Link to my Instragram account"
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {feather('instagram', ['30', '30'], svgStyles)}
                </a>
              </Li>
              <Li>
                <a title="My E-Mail address" href={`mailto:${email}`}>
                  {feather('mail', ['30', '30'], svgStyles)}
                </a>
              </Li>
            </ul>
          </Wrapper>
        </Box>
      </Flex>
    </Box>
    <Box px={[3, 3, 1]} align="center">
      <p>{`Copyright © 2020 ${name}. All rights reserved.`}</p>
    </Box>
  </div>
);

Footer.propTypes = {
  name: PropTypes.string,
  linkedin: PropTypes.string,
  github: PropTypes.string,
  facebook: PropTypes.string,
  instagram: PropTypes.string,
  email: PropTypes.string
};

Footer.defaultProps = {
  name: 'EM51 Maras Production',
  linkedin: 'https://www.linkedin.com/in/marek-czy%C5%BC-48bb4ab5/',
  github: 'https://github.com/maras333',
  facebook: 'https://www.facebook.com/marek.czyz.16',
  instagram: 'https://www.instagram.com/marassowy/',
  email: 'maras.czyz@gmail.com'
};

export default Footer;
