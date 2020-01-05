/* eslint-disable */
import React from 'react';
import { graphql } from 'gatsby';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import styled, { css } from 'react-emotion';
import { width, textAlign, space } from 'styled-system';
import { Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Flex } from '../../components/Layout';
import colors from '../../utils/colors';
import PageWrapper from '../../components/PageWrapper';
import media from '../../utils/media';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    transition: 'all 0.3s cubic-bezier(.5,.8,.5,1)',
    '&:hover': {
      boxShadow: '0 14px 50px rgba(0,0,0,0.8), 0 10px 10px rgba(0,0,0,0.8)'
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
  }
}));

const listStyle = css`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const Heading1 = styled.h1`
  ${space} ${textAlign} ${width};
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
`;

const BlogIndex = ({ data }) => {
  const classes = useStyles();
  const { edges: posts } = data.allStrapiPost;
  return (
    <PageWrapper>
      <Box 
        className={blogWrapper}
        bg={colors.primary} 
        width={['100vw', '100vw', '100vw']}
        maxWidth={['100%', '100%', '100%']}
        m="0 auto"
        py={[2, 3, 4]}
        px={[2, 3, 6]}
      >
        <Flex className={flexContainer} alignItems="center" flexDirection="column" wrap={['wrap', 'wrap', 'wrap']}>
          <Heading1 textAlign="center">Blog</Heading1>
          <Container maxWidth="md">
            <Typography variant="h5" align="center" paragraph>
              This is landing page of my super turbo blog! You will find there a great content, so don't hesitate and try to spend here at least 10 minutes!
            </Typography>
          </Container>
          <Container className={classes.cardGrid}>
            {/* End hero unit */}
            <Grid container spacing={10}>
              {posts.map(({ node: post }, index) => (
                <Grid item key={post.id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia>
                      <Img fluid={post.image.childImageSharp.fluid} />
                    </CardMedia>
                    <CardContent className={classes.cardContent}>
                      <Typography className={classes.typography} gutterBottom variant="h5" component="h2">
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
              ))}
            </Grid>
          </Container>
        </Flex>
      </Box>
    </PageWrapper>
  );
};

export const query = graphql`
  query BlogIndexQuery {
    allStrapiPost {
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
  }
`;
/* eslint-enable */

export default BlogIndex;
