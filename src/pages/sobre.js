import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Texto = styled.div`
  max-width: 720px;
  padding-top: 40px;
  font-size: 1.05rem;

  h2 {
    margin-top: 36px;
    font-size: 1.3rem;
  }
`

const Estados = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: 10px;

  li {
    background: var(--papel);
    border: 1px solid var(--borda);
    border-radius: 6px;
    padding: 10px 14px;
  }

  strong {
    font-family: "Space Mono", monospace;
    margin-right: 8px;
  }
`

const SobrePage = () => (
  <Layout>
    <Texto className="container">
      <h1>A loja</h1>
      <p>
        A Toca do Treinador começou como uma mesa numa feira de quadrinhos e
        hoje é uma lojinha física e online focada em Pokémon TCG. A ideia sempre
        foi a mesma: vender carta avulsa com preço honesto e descrição real do
        estado de cada uma.
      </p>
      <p>
        Toda sexta tem torneio casual na loja. Não precisa ser nenhum
        campeão, é só aparecer com seu deck.
      </p>

      <h2>Como classificamos as cartas</h2>
      <Estados>
        <li>
          <strong>NM</strong> quase nova, sem marcas visíveis
        </li>
        <li>
          <strong>LP</strong> pouco jogada, pequenos desgastes nas bordas
        </li>
        <li>
          <strong>MP</strong> moderadamente jogada, marcas visíveis mas sem dobras
        </li>
      </Estados>
    </Texto>
  </Layout>
)

export default SobrePage

export const Head = () => (
  <Seo
    title="A loja"
    description="Conheça a Toca do Treinador, loja de cartas Pokémon TCG com cartas avulsas e produtos selados."
    pathname="/sobre/"
  />
)
