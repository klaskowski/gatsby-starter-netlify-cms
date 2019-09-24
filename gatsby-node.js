const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

const slug = require(`slug`)
const slash = require(`slash`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {              
              templateKey
            }
          }
        }
      }
      allTinsJson(limit: 1000) {
        edges {
          node {
            id
          }
        }
      }
    }
  `)

    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const reportTemplates = result.data.allMarkdownRemark.edges

    const v3 = path.resolve(`src/templates/report.js`)
    result.data.allTinsJson.edges.forEach(edge => {
      createPage({
        path: `/${slug(edge.node.tin)}/`,
        component: slash(v3),
        context: {
          id: reportTemplates.find(el => el.node.frontmatter.templateKey == "report").node.id,
          report: edge.node.id,
        }
      })
    })
  }


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
