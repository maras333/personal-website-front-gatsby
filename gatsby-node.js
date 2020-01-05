const parseFilepath = require('parse-filepath');
const path = require('path');
const Webpack = require('webpack');

// exports.onCreateWebpackConfig = ({ config, stage }) => {
//  switch (stage) {
//    case 'develop':
//      config.preLoader('eslint-loader', {
//        test: /\.(js|jsx)$/,
//        exclude: /node_modules/
//      });
//
//      break;
//  }
//  return config;
// };

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors);
        }
        return result;
      })
    );
  });

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const parsedFilePath = parseFilepath(fileNode.relativePath);

    const slug = `/${parsedFilePath.dir}`;
    createNodeField({ node, name: 'slug', value: slug });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const getArticles = makeRequest(graphql, `
    {
      allStrapiPost {
        edges {
          node {
            id
            slug
          }
        }
      }
    }      
    `
  ).then(result => {
    result.data.allStrapiPost.edges.forEach(({ node }) => {
      createPage({
        path: `/blog/${node.slug}`,
        component: path.resolve(`src/templates/blog-post-template.js`),
        context: {
          slug: node.slug
        }
      });
    });
  });
  // Query for articles nodes to use in creating pages.
  return getArticles;
};
