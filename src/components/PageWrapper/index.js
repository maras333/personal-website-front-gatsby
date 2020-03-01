import React from 'react';
import styled, { injectGlobal, css } from 'react-emotion';
import { fontSize, minHeight } from 'styled-system';
import PropTypes from 'prop-types';
import Navigation from '../Navigation';
import Footer from '../Footer';
import colors from '../../utils/colors';

/* eslint-disable */
import normalize from 'normalize.css';
injectGlobal`
  * {
      font-family: -apple-system, BlinkMacSystemFont,
             'avenir next', avenir,
             'helvetica neue', helvetica,
             roboto, noto,
             'segoe ui', arial,
             sans-serif;
      box-sizing: border-box;
  }; 

  html {
    min-width: 320px;
  }
  body {
    padding-top: 3.5rem;
    min-width: 320px;
  }
  a {
    text-decoration: none;
    color: inherit;
  };
  a:hover {
    cursor: pointer;
  };
  h1, h2, h3, h4, h5, h6 {
    color: ${colors.secondary};
    line-height: 1.4;
  };
  p {
    color: ${colors.secondary};
    line-height: 1.4;
  }
  
  /* 
  * Purpose:
  * Assign height: "100%" to
  * html, body, #___gatsby &  
  * div with role="group"
 */
 
 html, body, #___gatsby {
     height: 100%;
 }  

 div[id="gatsby-focus-wrapper"] {
  height: 100%;
 }
`;
/* eslint-enable */

const FontConfig = styled.div`
  ${fontSize};
  ${minHeight};
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const Layout = ({ children }) => (
  <FontConfig fontSize={[3, 3, 3]}>
    <Navigation />
    {children}
    <Footer />
  </FontConfig>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
