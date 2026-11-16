import React from "react"
import styled from "styled-components"

const Rodape = styled.footer`
  margin-top: 80px;
  padding: 40px 0 28px;
  border-top: 1px solid var(--borda);
  font-size: 0.9rem;
  color: var(--tinta-suave);

  .colunas {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 32px;
  }

  h4 {
    margin: 0 0 8px;
    color: var(--tinta);
  }

  p {
    margin: 0 0 4px;
  }

  small {
    display: block;
    margin-top: 32px;
    font-size: 0.8rem;
  }

  @media (max-width: 720px) {
    .colunas {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
`

const Footer = ({ titulo, instagram }) => (
  <Rodape>
    <div className="container">
      <div className="colunas">
        <div>
          <h4>{titulo}</h4>
          <p>Cartas avulsas, produtos selados e acessórios de Pokémon TCG.</p>
          <p>Envio para todo o Brasil pelos Correios.</p>
        </div>
        <div>
          <h4>Horário</h4>
          <p>Seg a sex: 10h às 19h</p>
          <p>Sábado: 10h às 16h</p>
        </div>
        <div>
          <h4>Redes</h4>
          <p>
            <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer">
              @{instagram}
            </a>
          </p>
        </div>
      </div>
      <small>
        © {new Date().getFullYear()} {titulo}. Pokémon e os nomes das cartas são
        marcas registradas de seus respectivos donos. Site feito com Gatsby.
      </small>
    </div>
  </Rodape>
)

export default Footer
