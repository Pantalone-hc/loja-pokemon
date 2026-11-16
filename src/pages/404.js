import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <div className="container" style={{ paddingTop: 60, textAlign: "center" }}>
      <h1>Página não encontrada</h1>
      <p>Parece que essa carta fugiu da pokébola.</p>
      <Link to="/">Voltar para o início</Link>
    </div>
  </Layout>
)

export default NotFoundPage

export const Head = () => <Seo title="Página não encontrada" />
