const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "content/cartas" })
    actions.createNodeField({
      node,
      name: "slug",
      value: `/cartas${slug}`,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Erro ao buscar as cartas", result.errors)
    return
  }

  const template = path.resolve("./src/templates/carta.js")

  result.data.allMarkdownRemark.nodes.forEach(carta => {
    createPage({
      path: carta.fields.slug,
      component: template,
      context: { id: carta.id },
    })
  })
}
