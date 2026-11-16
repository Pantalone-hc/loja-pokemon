import React, { useState } from "react"
import styled from "styled-components"

// endpoint de teste: só devolve o que recebeu.
// pra usar de verdade dá pra trocar por um do Formspree, por exemplo
const ENDPOINT = "https://httpbin.org/post"

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 20px;
  background: var(--papel);
  border: 1px solid var(--borda);
  border-radius: var(--raio);
  padding: 28px;

  .campo {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .inteiro {
    grid-column: 1 / -1;
  }

  label {
    font-weight: 500;
    font-size: 0.9rem;
  }

  input,
  select,
  textarea {
    font: inherit;
    padding: 10px 12px;
    border: 1px solid var(--borda);
    border-radius: 6px;
    background: #fff;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: 2px solid var(--amarelo);
    border-color: var(--tinta);
  }

  .invalido {
    border-color: var(--vermelho);
  }

  .erro {
    color: var(--vermelho);
    font-size: 0.8rem;
  }

  button {
    justify-self: start;
    background: var(--vermelho);
    color: #fff;
    border: 0;
    border-radius: 6px;
    padding: 12px 28px;
    font: inherit;
    font-weight: 500;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 20px;

    button {
      justify-self: stretch;
    }
  }
`

const Aviso = styled.p`
  grid-column: 1 / -1;
  margin: 0;
  padding: 12px 14px;
  border-radius: 6px;
  background: ${({ $tipo }) => ($tipo === "ok" ? "#dff0d8" : "#f8dcd8")};
`

const valoresIniciais = { nome: "", email: "", telefone: "", assunto: "", mensagem: "" }

function validar(dados) {
  const erros = {}

  if (dados.nome.trim().length < 3) {
    erros.nome = "Informe seu nome (mínimo 3 letras)."
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
    erros.email = "E-mail inválido."
  }

  // telefone é opcional, mas se preencher tem que ter pelo menos DDD + número
  const soNumeros = dados.telefone.replace(/\D/g, "")
  if (dados.telefone && (soNumeros.length < 10 || soNumeros.length > 11)) {
    erros.telefone = "Use o formato (11) 91234-5678."
  }

  if (!dados.assunto) {
    erros.assunto = "Escolha um assunto."
  }

  if (dados.mensagem.trim().length < 10) {
    erros.mensagem = "A mensagem precisa ter pelo menos 10 caracteres."
  }

  return erros
}

const ContactForm = () => {
  const [dados, setDados] = useState(valoresIniciais)
  const [erros, setErros] = useState({})
  const [status, setStatus] = useState(null) // null | enviando | ok | falha

  const handleChange = e => {
    const { name, value } = e.target
    setDados({ ...dados, [name]: value })

    // tira o erro do campo assim que a pessoa corrige
    if (erros[name]) {
      setErros({ ...erros, [name]: undefined })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const novosErros = validar(dados)
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return

    setStatus("enviando")
    try {
      const resp = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      })
      if (!resp.ok) throw new Error(resp.status)

      setStatus("ok")
      setDados(valoresIniciais)
    } catch (err) {
      console.error("falha ao enviar formulário", err)
      setStatus("falha")
    }
  }

  const campo = nome => ({
    id: nome,
    name: nome,
    value: dados[nome],
    onChange: handleChange,
    className: erros[nome] ? "invalido" : undefined,
    "aria-invalid": !!erros[nome],
  })

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <div className="campo">
        <label htmlFor="nome">Nome *</label>
        <input type="text" {...campo("nome")} />
        {erros.nome && <span className="erro">{erros.nome}</span>}
      </div>

      <div className="campo">
        <label htmlFor="email">E-mail *</label>
        <input type="email" {...campo("email")} />
        {erros.email && <span className="erro">{erros.email}</span>}
      </div>

      <div className="campo">
        <label htmlFor="telefone">WhatsApp</label>
        <input type="tel" placeholder="(11) 91234-5678" {...campo("telefone")} />
        {erros.telefone && <span className="erro">{erros.telefone}</span>}
      </div>

      <div className="campo">
        <label htmlFor="assunto">Assunto *</label>
        <select {...campo("assunto")}>
          <option value="">Selecione...</option>
          <option value="duvida">Dúvida sobre uma carta</option>
          <option value="encomenda">Encomendar carta</option>
          <option value="venda">Quero vender minha coleção</option>
          <option value="outro">Outro</option>
        </select>
        {erros.assunto && <span className="erro">{erros.assunto}</span>}
      </div>

      <div className="campo inteiro">
        <label htmlFor="mensagem">Mensagem *</label>
        <textarea rows="6" {...campo("mensagem")} />
        {erros.mensagem && <span className="erro">{erros.mensagem}</span>}
      </div>

      {status === "ok" && (
        <Aviso $tipo="ok">Mensagem enviada! A gente responde em até 1 dia útil.</Aviso>
      )}
      {status === "falha" && (
        <Aviso $tipo="falha">
          Não foi possível enviar agora. Tente de novo ou chama no Instagram.
        </Aviso>
      )}

      <button type="submit" disabled={status === "enviando"}>
        {status === "enviando" ? "Enviando..." : "Enviar mensagem"}
      </button>
    </Form>
  )
}

export default ContactForm
