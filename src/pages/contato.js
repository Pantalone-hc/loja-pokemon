import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ContactForm from "../components/contact-form"

const Wrapper = styled.div`
  max-width: 760px;
  padding-top: 40px;

  > p {
    color: var(--tinta-suave);
    margin-bottom: 28px;
  }
`

const ContatoPage = () => (
  <Layout>
    <Wrapper className="container">
      <h1>Fale com a gente</h1>
      <p>
        Procurando uma carta que não está no site? Quer vender sua coleção?
        Manda uma mensagem que a gente responde rapidinho.
      </p>
      <ContactForm />
    </Wrapper>
  </Layout>
)

export default ContatoPage

export const Head = () => (
  <Seo
    title="Contato"
    description="Entre em contato com a Toca do Treinador para dúvidas, encomendas ou venda da sua coleção de cartas Pokémon."
    pathname="/contato/"
  />
)
