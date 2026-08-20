import { useEffect, useState } from "react"
import "./app.css"
import FilmeCard from "./components/FilmeCard"
import Input from "./components/Input"
import Filtros from "./components/Filtros"
import Botao from "./components/Botao"

function App() {
  const [mostrar, setMostrar] = useState(false)
  const [novoFilme, setNovoFilme] = useState("")
  const [novoGenero, setNovoGenero] = useState("")
  const [filmes, setFilmes] = useState(() => {
    const dados = localStorage.getItem("filmes")
    if (dados !== null) {
      return JSON.parse(dados)
    }
    return []
  })

  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [filtroGenero, setFiltroGenero] = useState("todos")
  function mostrarFormulario() {
    setMostrar(true) 
  }
  
  function addFilme(event) {
    event.preventDefault()
    if (novoFilme.trim() && novoGenero.trim()) {
      setFilmes([...filmes,
        {id: Date.now(), nome: novoFilme, genero: novoGenero, assistido: false},
      ])
      setNovoFilme("")
      setNovoGenero("")
      setMostrar(false)      
    } else {
      alert("Digite o nome e o gênero do filme!")
    }
  }
  function remove(idParaRemover){
    setFilmes((filmesAtuais) => filmesAtuais.filter((item) => item.id !== idParaRemover))
  }
  function alternarAssistido(id) {
    setFilmes((filmesAtuais) => filmesAtuais.map((item) => item.id === id ? {...item, assistido: !item.assistido} : item))
  }
  useEffect (() => {
    localStorage.setItem("filmes", JSON.stringify(filmes))
  }, [filmes])
  
  return (
    <>
      <header>
        <h1>Minha Biblioteca de Filmes</h1>
      </header>
      <main>
        <section className="cadastro">    
          <button className="add-filme" onClick={mostrarFormulario}>+ Adicionar filme</button>
          {mostrar && (
            <form className="form-control" onSubmit={addFilme}>
              <Input label="Nome do filme" placeholder="Insira o nome do filme" value={novoFilme} onChange={(e) => setNovoFilme(e.target.value)} />
              <Input label="Gênero" placeholder="Insira o gênero" value={novoGenero} onChange={(e) => setNovoGenero(e.target.value)} />
              <Botao>Adicionar</Botao>
            </form>
          )}
        </section>
        <section className="filtro">
          <p>Filtrar: </p>
          <Filtros filtroStatus={filtroStatus} setFiltroStatus={setFiltroStatus} filtroGenero={filtroGenero} setFiltroGenero={setFiltroGenero} filmes={filmes} />
        </section>
        <section className="card">
          <h4>Filmes</h4>
          <h4>Gênero</h4>
        </section>
        <section >
          {filmes
            .filter((item) => {
                if (filtroStatus === "todos") {
                  return true
                }
                if (filtroStatus === "assistidos") {
                  return item.assistido
                }
                return !item.assistido
              }
            )
            .filter((item) => {
              if (filtroGenero === "todos") {
                return true
              }
              return item.genero === filtroGenero
            })
            .map((item) => (
              <FilmeCard 
                key={item.id}
                nome={item.nome} 
                genero={item.genero}
                assistido={item.assistido}
                id={item.id}
                remove={remove}
                alternarAssistido={alternarAssistido}
              />       
          ))}
        </section>
      </main>
    </>
  )
}
export default App
