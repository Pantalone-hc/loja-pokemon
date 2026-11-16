import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Lista = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 2px solid var(--tinta);

  li {
    border-bottom: 1px solid var(--borda);
  }

  a {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
    padding: 12px 4px;
    text-decoration: none;
  }

  a:hover .titulo {
    text-decoration: underline;
  }

  time {
    font-family: "Space Mono", monospace;
    font-size: 0.8rem;
    color: var(--tinta-suave);
    white-space: nowrap;
  }

  @media (max-width: 500px) {
    a {
      flex-direction: column;
      gap: 2px;
    }
  }
`

// lista simples com o título e a data de atualização de cada página
const ListaLinks = ({ itens }) => (
  <Lista>
    {itens.map(item => (
      <li key={item.id}>
        <Link to={item.fields.slug}>
          <span className="titulo">{item.frontmatter.title}</span>
          <time dateTime={item.frontmatter.dataISO}>
            atualizado em {item.frontmatter.date}
          </time>
        </Link>
      </li>
    ))}
  </Lista>
)

export default ListaLinks
