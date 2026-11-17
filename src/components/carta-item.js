import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { formatarPreco } from "../utils"

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  background: var(--papel);
  border: 1px solid var(--borda);
  border-radius: var(--raio);
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(29, 33, 51, 0.12);
  }

  .info {
    padding: 14px 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }

  h3 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
  }

  .preco {
    margin-top: auto;
    font-weight: 700;
    font-size: 1.1rem;
  }

  .esgotando {
    color: var(--vermelho);
    font-size: 0.8rem;
  }
`

const CartaItem = ({ carta }) => {
  const { title, preco, colecao, estoque, imagem } = carta.frontmatter

  return (
    <Card to={carta.fields.slug}>
      <GatsbyImage image={getImage(imagem)} alt={title} />
      <div className="info">
        <span className="etiqueta">{colecao}</span>
        <h3>{title}</h3>
        {estoque === 0 && <span className="esgotando">Esgotado</span>}
        {estoque === 1 && <span className="esgotando">Última unidade</span>}
        {estoque === 2 && <span className="esgotando">Últimas 2 unidades</span>}
        <span className="preco">{formatarPreco(preco)}</span>
      </div>
    </Card>
  )
}

export default CartaItem
