import React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import CartaItem from "../components/carta-item"
import ListaLinks from "../components/lista-links"

const Hero = styled.section`
  display: grid;
  position: relative;
  color: #fff;

  & > * {
    grid-area: 1 / 1;
  }

  .texto {
    position: relative;
    align-self: center;
    padding: 60px 20px;
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3.2rem);
    max-width: 14ch;
  }

  p {
    max-width: 46ch;
    font-size: 1.1rem;
    opacity: 0.9;
  }

  a {
    display: inline-block;
    margin-top: 12px;
    background: var(--amarelo);
    color: var(--tinta);
    padding: 12px 24px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 500;
  }
`

const Secao = styled.section`
  margin-top: 56px;

  .cabecalho {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 20px;
  }

  .cabecalho a {
    font-size: 0.9rem;
  }
`

const Grade = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`

const IndexPage = ({ data }) => {
  const cartas = data.allMarkdownRemark.nodes
  const destaques = cartas.slice(0, 4)

  return (
    <Layout>
      <Hero>
        <StaticImage
          src="../images/banner-loja.jpg"
          alt=""
          layout="fullWidth"
          style={{ maxHeight: 460 }}
          placeholder="blurred"
        />
        <div className="texto container">
          <h1>Cartas Pokémon com preço justo</h1>
          <p>
            Avulsas para completar seu deck, produtos selados e acessórios.
            Todas as cartas são conferidas antes do envio.
          </p>
          <Link to="/cartas/">Ver catálogo</Link>
        </div>
      </Hero>

      <div className="container">
        <Secao>
          <div className="cabecalho">
            <h2>Chegaram agora</h2>
            <Link to="/cartas/">ver todas</Link>
          </div>
          <Grade>
            {destaques.map(carta => (
              <CartaItem key={carta.id} carta={carta} />
            ))}
          </Grade>
        </Secao>

        <Secao>
          <h2>Últimas atualizações do catálogo</h2>
          <ListaLinks itens={cartas} />
        </Secao>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 20) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "DD/MM/YYYY")
          dataISO: date(formatString: "YYYY-MM-DD")
          preco
          colecao
          estoque
          imagem {
            childImageSharp {
              gatsbyImageData(width: 400, aspectRatio: 0.9, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`

export default IndexPage

export const Head = () => <Seo pathname="/" />
