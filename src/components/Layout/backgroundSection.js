import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'react-emotion';
import BackgroundImage from 'gatsby-background-image';

const BackgroundSection = ({ className, children }) => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "bg.jpg" }) {
          childImageSharp {
            fluid(
              cropFocus: CENTER
              duotone: { highlight: "#393b41", shadow: "#474a51", opacity: 80 }
              grayscale: false
              quality: 90
              maxWidth: 1920
            ) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.file.childImageSharp;
      return (
        <BackgroundImage
          Tag="section"
          className={className}
          fluid={imageData.fluid}
          backgroundColor="#040e18"
        >
          {children}
        </BackgroundImage>
      );
    }}
  />
);

BackgroundSection.propTypes = {
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
  children: PropTypes.element.isRequired
};

const StyledBackgroundSection = styled(BackgroundSection)`
  width: 100%;
  background-position: bottom center;
  background-repeat: repeat-y;
  background-size: cover;
  opacity: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export default StyledBackgroundSection;
