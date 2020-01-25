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

exports.createPages = async ({ graphql, actions, reporter }) => {
  try {
    const { createPage } = actions;
    const blogPostTemplate = path.resolve(`src/templates/blog-post-template.js`);
    const categoryPostsTemplate = path.resolve(`src/templates/blog-category-posts-template.js`);
    const result = await makeRequest(graphql, `
      query {
        allStrapiPost {
          edges {
            node {
              id
              slug
            }
          }
        }
        allStrapiCategory {
          edges {
            node {
              id
              slug
            }
          }
        }
      }      
      `
    );
    // handling errors
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query!`)
      return
    }

    const allPosts = result.data.allStrapiPost.edges;
    allPosts.forEach(({ node }) => {
      createPage({
        path: `/blog/${node.slug}`,
        component: blogPostTemplate,
        context: {
          slug: node.slug
        }
      });    
    })

    const allCategories = result.data.allStrapiCategory.edges;
    allCategories.forEach(({ node }) => {
      createPage({
        path: `/blog/categories/${node.slug}`,
        component: categoryPostsTemplate,
        context: {
          slug: node.slug
        }
      });       
    });
  } catch(e) { console.log(e); }
  // Query for articles nodes to use in creating pages.
};
