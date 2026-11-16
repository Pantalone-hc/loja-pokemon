import React, { useState } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import CartaItem from "../components/carta-item"

const Topo = styled.div`
  padding-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: end;
  gap: 16px;
  margin-bottom: 24px;

  p {
    margin: 0;
    color: var(--tinta-suave);
  }

  select {
    font: inherit;
    padding: 8px 10px;
    border: 1px solid var(--borda);
    border-radius: 6px;
    background: var(--papel);
  }
`

const Grade = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
`

const CartasPage = ({ data }) => {
  const todas = data.allMarkdownRemark.nodes
  const [ordem, setOrdem] = useState("recentes")

  const lista = [...todas].sort((a, b) => {
    if (ordem === "menor") return a.frontmatter.preco - b.frontmatter.preco
    if (ordem === "maior") return b.frontmatter.preco - a.frontmatter.preco
    return 0 // já vem ordenado por data da query
  })

  return (
    <Layout>
      <div className="container">
        <Topo>
          <div>
            <h1>Catálogo</h1>
            <p>{todas.length} produtos disponíveis</p>
          </div>
          <label>
            Ordenar por{" "}
            <select value={ordem} onChange={e => setOrdem(e.target.value)}>
              <option value="recentes">mais recentes</option>
              <option value="menor">menor preço</option>
              <option value="maior">maior preço</option>
            </select>
          </label>
        </Topo>

        <Grade>
          {lista.map(carta => (
            <CartaItem key={carta.id} carta={carta} />
          ))}
        </Grade>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
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

export default CartasPage

export const Head = () => (
  <Seo
    title="Catálogo"
    description="Todas as cartas Pokémon avulsas e produtos selados disponíveis na Toca do Treinador."
    pathname="/cartas/"
  />
)
