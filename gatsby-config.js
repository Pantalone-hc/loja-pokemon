
const siteUrl = "https://Pantalone-hc.github.io/loja-pokemon"

module.exports = {
  pathPrefix: "/loja-pokemon",
  siteMetadata: {
    title: "Toca do Treinador",
    description:
      "Loja de cartas Pokémon TCG: cartas avulsas, produtos selados e acessórios. Envio para todo o Brasil.",
    siteUrl,
    image: "/og-image.jpg",
    instagram: "tocadotreinador",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "cartas",
        path: `${__dirname}/content/cartas`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap-index.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Toca do Treinador",
        short_name: "Toca",
        start_url: "/",
        background_color: "#f3efe7",
        theme_color: "#1d2133",
        display: "minimal-ui",
        icon: "src/images/icone.png",
      },
    },
  ],
}
