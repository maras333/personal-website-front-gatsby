/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import styled, { css } from 'react-emotion';
import { width, textAlign, space, zIndex } from 'styled-system';
import { Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { formatPostDate } from '../../utils/helpers';
import { Box, Flex } from '../../components/Layout';
import colors from '../../utils/colors';
import PageWrapper from '../../components/PageWrapper';
import ConstellationCanvas from '../../components/Canvas';
import SubNavigation from '../../components/SubNavigation';
import media from '../../utils/media';
import SEO from '../../components/SEO';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
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
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  typography: {
    color: colors.primary
  },
  date: {
    color: colors.primary,
    lineHeight: 2.5,
    textAlign: 'right',
    fontWeight: 700
  }
}));

const Heading1 = styled.h1`
  ${space} ${textAlign} ${width} ${zIndex};
`;

const blogWrapper = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: center;
`;

const flexContainer = css`
  box-shadow: -10px -10px 20px rgba(0, 0, 0, 0.8);
  ${media.mid`
    box-shadow: none;
  `};  
  position: relative;
  overflow: hidden;  
`;

const BlogIndex = ({ data }) => {
  const classes = useStyles();
  const { edges: posts } = data.allStrapiPost;
  const { edges: categories } = data.allStrapiCategory;
  const imageData = data.file.childImageSharp;

  const [elHeight, setElHeight] = useState(0);
  const [elWidth, setElWidth] = useState(0);
  const flexEl = useRef();

  useEffect(() => {
    setElHeight(flexEl.current.clientHeight);
    setElWidth(flexEl.current.clientWidth);
  }, []);

  return (
    <>
      <SEO
        title="Blog about programming, cycling and running"
        description="The main purpose of this blog is to share my experience on programming, cycling and running. That was the original idea and motivation to set it up:)
        So if you like some numbers, statistics, sports and everything connected with workouts, it may be quite a stuff for you, but I do not promise!:P"
        pathname={`/blog`}
        article={false}
      />
      <PageWrapper>
        <Box
          className={blogWrapper}
          bg={colors.primary}
          width={['100vw', '100vw', '100vw']}
          maxWidth={['100%', '100%', '100%']}
          m="0 auto"
          pt={[2, 3, 0]}
          pb={[2, 3, 4]}
          px={[2, 3, 4]}
        >
          <SubNavigation categories={categories} width={[1, 1, 2 / 3]}></SubNavigation>
          <Flex width={[1, 1, 2 / 3]} innerRef={flexEl} className={flexContainer} alignItems="center" flexDirection="column" wrap={['wrap', 'wrap', 'wrap']}>
            <ConstellationCanvas width={elWidth} height={elHeight} />
            <Heading1 zIndex={1} textAlign="center">Blog</Heading1>
            <Container className={classes.subtitleContainer} maxWidth="lg">
              <Typography variant="h5" align="center" paragraph>
                The main purpose of this blog is to share my experience on programming, cycling and running. That was the original idea and motivation to set it up:)
                So if you like some numbers, statistics, sports and everything connected with workouts, it may be quite a stuff for you, but I do not promise!:P
            </Typography>
            </Container>
            <Container className={classes.cardGrid}>
              {/* End hero unit */}
              <Grid container spacing={10}>
                {posts.length
                  ? posts.map(({ node: post }, index) => (
                    <Grid item key={post.id} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <Link to={`/blog/${post.slug}`}>
                          <CardMedia>
                            {
                              post.image
                                ? <Img fluid={post.image.childImageSharp.fluid} />
                                : <Img fluid={imageData.fluid} />
                            }
                          </CardMedia>
                          <CardContent className={classes.cardContent}>
                            <Typography className={classes.date}>
                              {formatPostDate(post)}
                            </Typography>
                            <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
                              {post.title}
                            </Typography>
                            <Typography className={classes.typography}>
                              {post.lead}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button className={classes.typography} size="large">READ</Button>
                          </CardActions>
                        </Link>
                      </Card>
                    </Grid>
                  ))
                  : ''}
              </Grid>
            </Container>
          </Flex>
        </Box>
      </PageWrapper>
    </>
  );
};

export const query = graphql`
  query BlogIndexQuery {
    file(relativePath: { eq: "placeholder-post-image.jpg" }) {
      childImageSharp {
        fluid(grayscale: true, maxWidth: 300, maxHeight: 200, quality: 70, cropFocus: CENTER ) {
          ...GatsbyImageSharpFluid
        }
      }
    }    
    allStrapiPost(sort: {fields: createdAt, order: DESC}) {
      edges {
        node {
          id
          slug
          title
          lead
          createdAt
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
    allStrapiCategory {
      edges {
        node {
          id
          name
          slug
        }
      }
    }   
  }
`;
/* eslint-enable */

export default BlogIndex;
