/* eslint-disable no-undef, react/prop-types, react/no-danger */
import React from 'react';
import { Link, graphql } from 'gatsby';
import styled, { css } from 'react-emotion';
import { space } from 'styled-system';
import showdown from 'showdown';
import { Box } from '../components/Layout';
import colors from '../utils/colors';
import PageWrapper from '../components/PageWrapper';
import { ButtonSecondary } from '../components/Buttons';
import feather from '../utils/feather';

const converter = new showdown.Converter();

const svgStyles = css`
  vertical-align: middle;
`;

const contentContainerStyle = css`
  & img {
    max-width: 100%;
    margin: 1rem 0;
  }
`;

const articleStyle = css`
  & hr {
    background: rgb(214, 218, 222);
  }
`;

const Article = styled.article`
  ${space};
`;

const articleWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1;
  align-items: flex-start;
`;

const Template = ({ data }) => {
  const { strapiPost: post } = data;
  return (
    <PageWrapper>
      <Box className={articleWrapper} bg={colors.primary} py={[3, 3, 4]}>
        <Box
          width={[1, 1, 1 / 2]}
          m={['3.5rem 0 0 0', '3.5rem 0 0 0', '3.5rem auto 0 auto']}
          px={[3, 3, 0]}
          color={colors.secondary}
        >
          <Box width={[1, 1, 1 / 3]} px={[0, 0, 0]}>
            <Link to="/blog">
              <ButtonSecondary fontSize="24px">
                {feather('skip-back', ['24', '24'], svgStyles)}{' '}
                <span className={svgStyles}>Back</span>
              </ButtonSecondary>
            </Link>
          </Box>
          <Article className={articleStyle}>
            <h1>{post.title}</h1>
            <hr />
            <h4>Written by {post.lead}</h4>
            <div
              className={contentContainerStyle}
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(post.content)
              }}
            />
          </Article>
          <Box width={[1, 1, 1 / 3]} px={[0, 0, 0]}>
            <Link to="/blog">
              <ButtonSecondary fontSize="24px">
                {feather('skip-back', ['24', '24'], svgStyles)}{' '}
                <span className={svgStyles}>Back</span>
              </ButtonSecondary>
            </Link>
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  );
};

export const query = graphql`
  query BlogPostById($slug: String) {
    strapiPost(slug: { eq: $slug }) {
      title
      lead
      content
    }
  }
`;

export default Template;
