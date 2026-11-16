import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { formatarPreco } from "../utils"

const Article = styled.article`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 48px;
  padding-top: 32px;

  .foto {
    border-radius: var(--raio);
    overflow: hidden;
    border: 1px solid var(--borda);
    align-self: start;
  }

  .voltar {
    font-size: 0.9rem;
    color: var(--tinta-suave);
  }

  h1 {
    margin-top: 12px;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
  }

  .preco {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 4px 0 20px;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`

const Detalhes = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 6px 20px;
  padding: 16px 0;
  margin: 0 0 20px;
  border-top: 1px solid var(--borda);
  border-bottom: 1px solid var(--borda);
  font-size: 0.95rem;

  dt {
    color: var(--tinta-suave);
  }

  dd {
    margin: 0;
  }
`

const Botao = styled(Link)`
  display: inline-block;
  background: var(--vermelho);
  color: #fff;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  margin-top: 24px;
`

const CartaTemplate = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <Layout>
      <div className="container">
        <Article>
          <div className="foto">
            <GatsbyImage image={getImage(frontmatter.imagem)} alt={frontmatter.title} />
          </div>

          <div>
            <Link to="/cartas/" className="voltar">
              ← voltar para o catálogo
            </Link>
            <h1>{frontmatter.title}</h1>
            <p className="preco">{formatarPreco(frontmatter.preco)}</p>

            <Detalhes>
              <dt>Coleção</dt>
              <dd>{frontmatter.colecao}</dd>
              <dt>Tipo</dt>
              <dd>{frontmatter.tipo}</dd>
              <dt>Estado</dt>
              <dd>{frontmatter.estado}</dd>
              <dt>Estoque</dt>
              <dd>{frontmatter.estoque} un.</dd>
              <dt>Atualizado</dt>
              <dd>{frontmatter.date}</dd>
            </Detalhes>

            <div className="conteudo-markdown" dangerouslySetInnerHTML={{ __html: html }} />

            <Botao to="/contato/">Quero essa carta</Botao>
          </div>
        </Article>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY")
        preco
        colecao
        tipo
        estado
        estoque
        descricao
        imagem {
          childImageSharp {
            gatsbyImageData(width: 640, placeholder: BLURRED)
            social: gatsbyImageData(width: 1200, height: 630, layout: FIXED)
          }
        }
      }
    }
  }
`

export default CartaTemplate

export const Head = ({ data }) => {
  const { frontmatter, fields } = data.markdownRemark
  const imagemSocial = getSrc(frontmatter.imagem.childImageSharp.social)

  return (
    <Seo
      title={frontmatter.title}
      description={frontmatter.descricao}
      image={imagemSocial}
      pathname={fields.slug}
    />
  )
}
