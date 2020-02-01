module.exports = {
  siteMetadata: {
    title: `One revolution more!`,
    description: 'Blog about sports and programming simultaneously.',
    author: `Marek Czyż`,
    siteUrl: `https://www.marekczyz.xyz`
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': 'AuthorsYaml'
  },
  plugins: [
    // Adding various source folders to the GraphQL layer.
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images/`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: ``
      }
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        // apiURL: process.env.DEPLOY_URL
        //   ? `http://cms.marekczyz.xyz`
        //   : `http://localhost:1337`,
        // FOR DEVELOPMENT
        apiURL: `http://cms.marekczyz.xyz`,
        queryLimit: 1000, // Default to 100
        contentTypes: [`user`, `post`, `tag`, `category`],
        // Possibility to login with a strapi user, when content types are not publically available (optional).
        loginData: {
          identifier: '',
          password: ''
        }
      }
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-json',
    'gatsby-transformer-yaml',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true
        }
      }
    },
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allStrapiPost } }) =>
              allStrapiPost.edges.map(edge =>
                Object.assign(
                  {},
                  { title: edge.node.title },
                  {
                    lead: edge.node.lead,
                    category: edge.node.category.name,
                    date: edge.node.updatedAt,
                    url: `${site.siteMetadata.siteUrl}/blog/${edge.node.slug}`,
                    guid: edge.node.id
                  }
                )
              ),
            query: `
              {
                allStrapiPost(
                  sort: { order: DESC, fields: [updatedAt] },
                ) {
                  edges {
                    node {
                      id
                      title
                      lead
                      slug
                      createdAt
                      updatedAt
                      category {
                        name
                      }                      
                    }
                  }
                }
              }
            `,
            output: '/blog/rss.xml',
            title: 'Site RSS Feed'
          }
        ]
      }
    }
  ]
};
