import React from "react"
import styled from "styled-components"
import Header from "./header"
import Footer from "./footer"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const Principal = styled.main`
  min-height: 60vh;
`

const Layout = ({ children }) => {
  const { title, instagram } = useSiteMetadata()

  return (
    <>
      <Header titulo={title} />
      <Principal>{children}</Principal>
      <Footer titulo={title} instagram={instagram} />
    </>
  )
}

export default Layout
