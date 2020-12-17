module.exports = {
  siteMetadata: {
    title: `One revolution more!`,
    description: 'Blog about sports and programming simultaneously.',
    author: `Marek Czyż`,
    siteUrl: `https://www.marekczyz.xyz`,
    image: `/id.jpg`
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': 'AuthorsYaml'
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          process.env.GOOGLE_TRACKING_ID || 'none' // Google Analytics / GA
        ]
      }
    },
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
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.API_URL
          ? process.env.API_URL
          : `http://cms.marekczyz.xyz`,
        // API_URL: https://personal-blog-cms-staging.herokuapp.com/
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
    'gatsby-plugin-sitemap',
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
                    description: edge.node.lead,
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
                    }
                  }
                }
              }
            `,
            output: '/blog/rss.xml',
            title: 'One Revolution More Feed'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://www.marekczyz.xyz',
        sitemap: 'https://www.marekczyz.xyz/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    'gatsby-plugin-react-helmet'
  ]
};
