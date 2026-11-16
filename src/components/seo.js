import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const Seo = ({ title, description, image, pathname, children }) => {
  const site = useSiteMetadata()

  // imagens do gatsby-plugin-image já vêm com o caminho completo,
  // então só precisa juntar com o domínio
  const origem = new URL(site.siteUrl).origin
  const imagem = image ? origem + image : site.siteUrl + site.image

  const seo = {
    title: title ? `${title} | ${site.title}` : site.title,
    description: description || site.description,
    url: site.siteUrl + (pathname || ""),
  }

  return (
    <>
      <html lang="pt-BR" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={imagem} />
      <link rel="canonical" href={seo.url} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={imagem} />
      <meta property="og:url" content={seo.url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={imagem} />
      {children}
    </>
  )
}

export default Seo
