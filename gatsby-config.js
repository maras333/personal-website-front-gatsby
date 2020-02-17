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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: 'UA-114127986-2',
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Setting this parameter is optional
        anonymize: false,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: [],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        optimizeId: 'YOUR_GOOGLE_OPTIMIZE_TRACKING_ID',
        // Enables Google Optimize Experiment ID
        experimentId: 'YOUR_GOOGLE_EXPERIMENT_ID',
        // Set Variation ID. 0 for original 1,2,3....
        variationId: 'YOUR_GOOGLE_OPTIMIZE_VARIATION_ID',
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: 'auto'
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
    }
  ]
};
