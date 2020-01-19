/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import styled, { css } from 'react-emotion';
import { width, textAlign, space, zIndex } from 'styled-system';
import { Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Flex } from '../components/Layout';
import colors from '../utils/colors';
import PageWrapper from '../components/PageWrapper';
import ConstellationCanvas from '../components/Canvas';
import media from '../utils/media';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  subtitleContainer: {
    zIndex: 1
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    zIndex: 1
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-10px -10px 20px 5px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s cubic-bezier(.5,.8,.5,1)',
    '&:hover': {
      boxShadow: '-10px -10px 20px 5px rgba(0, 0, 0, 0.8)'
    }
  },
  cardMedia: {
    paddingTop: '56.25%' // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  typography: {
    color: colors.primary
  }
}));

const listStyle = css`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Heading1 = styled.h1`
    ${space} ${textAlign} ${width} ${zIndex};
  `;

const blogWrapper = css`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: center;
`;

const flexContainer = css`
  box-shadow: -10px -10px 20px rgba(0, 0, 0, 0.8);
  ${media.mid`
      box-shadow: none;
    `};
  position: relative;
  overflow: hidden;
`;

const CategoryPostsTemplate = ({ data }) => {
  const classes = useStyles();
  const { edges: posts } = data.allStrapiPost;
  const imageData = data.file.childImageSharp;
  const categoryData = data.strapiCategory;

  return (
    <PageWrapper>
      <Box
        className={blogWrapper}
        bg={colors.primary}
        width={['100vw', '100vw', '100vw']}
        maxWidth={['100%', '100%', '100%']}
        m="0 auto"
        py={[2, 3, 4]}
        px={[2, 3, 4]}
      >
        <Flex
          className={flexContainer}
          alignItems="center"
          flexDirection="column"
          wrap={['wrap', 'wrap', 'wrap']}
        >
          <Heading1 zIndex={1} textAlign="center">
            Blog
          </Heading1>
          <Container className={classes.subtitleContainer} maxWidth="lg">
            <Typography variant="h5" align="center" paragraph>
              {categoryData.name} category. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel massa nec lorem consectetur varius. Suspendisse potenti. Donec vitae dui scelerisque, pellentesque leo vel
            </Typography>
          </Container>
          <Container className={classes.cardGrid}>
            {/* End hero unit */}
            <Grid container spacing={10}>
              {posts.length
                ? posts.map(({ node: post }, index) => (
                  <Grid item key={post.id} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                      <CardMedia>
                          {post.image ? (
                          <Img fluid={post.image.childImageSharp.fluid} />
                          ) : (
                            <Img fluid={imageData.fluid} />
                          )}
                        </CardMedia>
                      <CardContent className={classes.cardContent}>
                          <Typography
                          className={classes.typography}
                          gutterBottom
                          variant="h5"
                          component="h2"
                        >
                          {post.title}
                        </Typography>
                          <Typography className={classes.typography}>
                          {post.lead}
                        </Typography>
                        </CardContent>
                      <CardActions>
                          <Button className={classes.typography} size="large">
                          <Link to={`/blog/${post.slug}`}>READ</Link>
                        </Button>
                        </CardActions>
                    </Card>
                    </Grid>
                  ))
                : ''}
            </Grid>
          </Container>
        </Flex>
      </Box>
    </PageWrapper>
  );
};

export const query = graphql`
  query BlogCategoryPostsQuery($slug: String) {
    file(relativePath: { eq: "placeholder-post-image.jpg" }) {
      childImageSharp {
        fluid(grayscale: true, maxWidth: 300, maxHeight: 200, quality: 70, cropFocus: CENTER ) {
          ...GatsbyImageSharpFluid
        }
      }
    }    
    allStrapiPost(filter: {category: {slug: {eq: $slug}}}) {
      edges {
        node {
          id
          slug
          title
          lead
          image {
            id
            childImageSharp {
              fluid(grayscale: true, maxWidth: 300, maxHeight: 200, quality: 70, cropFocus: CENTER) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    strapiCategory(slug: {eq: $slug}) {
      name 
    }
  }
`;
/* eslint-enable */

export default CategoryPostsTemplate;
