import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const Topo = styled.header`
  background: var(--tinta);
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
`

const Barra = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.15rem;

  span {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 3px solid #fff;
    background: linear-gradient(var(--vermelho) 45%, #fff 45%, #fff 55%, var(--papel) 55%);
  }
`

const Menu = styled.nav`
  display: flex;
  gap: 28px;

  a {
    text-decoration: none;
    font-size: 0.95rem;
    opacity: 0.85;
    padding: 4px 0;
    border-bottom: 2px solid transparent;
  }

  a:hover,
  a[aria-current="page"] {
    opacity: 1;
    border-color: var(--amarelo);
  }

  @media (max-width: 640px) {
    display: ${({ $aberto }) => ($aberto ? "flex" : "none")};
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: var(--tinta);
    padding: 8px 20px 16px;

    a {
      padding: 10px 0;
    }
  }
`

const BotaoMenu = styled.button`
  display: none;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #fff;
  border-radius: 6px;
  padding: 6px 12px;
  font: inherit;
  cursor: pointer;

  @media (max-width: 640px) {
    display: block;
  }
`

const Header = ({ titulo }) => {
  const [aberto, setAberto] = useState(false)

  return (
    <Topo>
      <Barra className="container">
        <Logo to="/">
          <span aria-hidden="true" />
          {titulo}
        </Logo>

        <BotaoMenu onClick={() => setAberto(!aberto)} aria-expanded={aberto}>
          {aberto ? "Fechar" : "Menu"}
        </BotaoMenu>

        <Menu $aberto={aberto}>
          <Link to="/">Início</Link>
          <Link to="/cartas/">Catálogo</Link>
          <Link to="/sobre/">A loja</Link>
          <Link to="/contato/">Contato</Link>
        </Menu>
      </Barra>
    </Topo>
  )
}

export default Header
