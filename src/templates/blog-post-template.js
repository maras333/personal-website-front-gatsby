/* eslint-disable no-undef, react/prop-types, react/no-danger */
import React from 'react';
import { Link, graphql } from 'gatsby';
import styled, { css } from 'react-emotion';
import { space } from 'styled-system';
import moment from 'moment';
import showdown from 'showdown';
import { Box, Flex } from '../components/Layout';
import colors from '../utils/colors';
import PageWrapper from '../components/PageWrapper';
import { ButtonSecondary } from '../components/Buttons';
import feather from '../utils/feather';
import media from '../utils/media';

const converter = new showdown.Converter();

const svgStyles = css`
  vertical-align: middle;
`;

const contentContainerStyle = css`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  items-align: flex-start;
  blockquote {
    font-style: italic;
    p {
      color: ${colors.quote};
    }
  }
  p {
    & img {
      display: block;
      margin: 0 auto;
      max-width: 66%;
      ${media.small`
      max-width: 100%;
    `};
    }
    & a {
      text-decoration: underline;
      :hover {
        color: ${colors.link};
      }
    }
  }
`;

const articleStyle = css`
  & hr {
    background: rgb(214, 218, 222);
  }
`;

const buttonPostTemplateStyle = css`
  ${media.small`
    padding: 0.5rem;
  `};
`;

const articleWrapper = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1;
  align-items: flex-start;
  & h5 {
    text-align: right;
  }
`;

const boxWrapper = css`
  box-shadow: -10px -10px 20px rgba(0, 0, 0, 0.8);
  ${media.mid`
    box-shadow: none;
  `};
`;

const Article = styled.article`
  ${space};
`;

const Template = ({ data }) => {
  const { strapiPost: post } = data;
  const renderedText =
    post.updatedAt > post.createdAt ? 'updated at:' : 'created at:';
  const formattedDate = moment(
    post.updatedAt > post.createdAt ? post.updatedAt : post.createdAt
  ).format('MMMM Do YYYY');

  return (
    <PageWrapper>
      <Box className={articleWrapper} bg={colors.primary} py={[3, 3, 4]}>
        <Box
          className={boxWrapper}
          width={[1, 1, 3 / 5]}
          px={[3, 3, 4]}
          py={[3, 3, 4]}
          color={colors.secondary}
        >
          <Box width={[1, 1, 1]} px={[0, 0, 0]}>
            <Flex flexDirection="row" justifyContent="space-between">
              <Link to="/blog">
                <ButtonSecondary
                  className={buttonPostTemplateStyle}
                  fontSize="24px"
                >
                  {feather('skip-back', ['24', '24'], svgStyles)}{' '}
                  <span className={svgStyles}>Back</span>
                </ButtonSecondary>
              </Link>
              <Link to={`/blog/categories/${post.category.slug}`}>
                <ButtonSecondary
                  className={buttonPostTemplateStyle}
                  fontSize="24px"
                >
                  <span className={svgStyles}>Go to category</span>
                </ButtonSecondary>
              </Link>
            </Flex>
          </Box>
          <Article className={articleStyle}>
            <h5>
              {renderedText} {formattedDate}
            </h5>
            <h1>{post.title}</h1>
            <hr />
            <h4>{post.lead}</h4>
            <div
              className={contentContainerStyle}
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(post.content)
              }}
            />
          </Article>
          <Box width={[1, 1, 1]} px={[0, 0, 0]}>
            <Flex flexDirection="row" justifyContent="space-between">
              <Link to="/blog">
                <ButtonSecondary
                  className={buttonPostTemplateStyle}
                  fontSize="24px"
                >
                  {feather('skip-back', ['24', '24'], svgStyles)}{' '}
                  <span className={svgStyles}>Back</span>
                </ButtonSecondary>
              </Link>
              <Link to={`/blog/categories/${post.category.slug}`}>
                <ButtonSecondary
                  className={buttonPostTemplateStyle}
                  fontSize="24px"
                >
                  <span className={svgStyles}>Go to category</span>
                </ButtonSecondary>
              </Link>
            </Flex>
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
      createdAt
      updatedAt
      category {
        slug
      }
    }
  }
`;

export default Template;
