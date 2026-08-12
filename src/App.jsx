import { useEffect, useState } from "react"
import "./app.css"
import FilmeCard from "./components/FilmeCard"
import Input from "./components/Input"
import Filtros from "./components/Filtros"
import Botao from "./components/Botao"

function App() {
  //Controla a interface, o formulário começa escondido
  const [mostrar, setMostrar] = useState(false)
  //Guarda o que está sendo digitado.
  const [novoFilme, setNovoFilme] = useState("")
  //Guarda o gênero digitado.
  const [novoGenero, setNovoGenero] = useState("")
  //Guarda todos os filmes cadastrados.
  const [filmes, setFilmes] = useState([])

  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [filtroGenero, setFiltroGenero] = useState("todos")
  //Exibe o formulário
  function mostrarFormulario() {
    setMostrar(true) 
  }
  
  function addFilme(event) {
    event.preventDefault()
    //Faz a verificação se os campos estão vazios
    if (novoFilme.trim() && novoGenero.trim()) {
      //Adicionar o novo filme cadastrado ao array que contém os outros filmes
      setFilmes([...filmes,
        {id: Date.now(), nome: novoFilme, genero: novoGenero, assistido: false},
      ])
      //Limpa os campos
      setNovoFilme("")
      setNovoGenero("")
      //Esconde o formulário
      setMostrar(false)      
    } else {
      alert("Digite o nome e o gênero do filme!")
    }
  }
  // Atualiza a lista filtrando apenas os filmes que possuem o ID diferente do idParaRemover. qu foi clicado.
  function remove(idParaRemover){
    setFilmes(filmes.filter((item) => item.id !== idParaRemover))
  }
  // Função que recebe o ID do filme que deve ser marcado/desmarcado
  function alternarAssistido(id) {
    //setFilmes atualiza o estado da lista com o novo array  modificado pelo map() que verifica se o ID do filme atual é o mesmo ID enviado para a função, se for o mesmo ID: cria um novo objeto copiando os dados antigos e inverte o valor de "assistido", se NÃO for o mesmo ID: retorna o filme idêntico, sem nenhuma alteração
    setFilmes(filmes.map((item) => item.id === id ? {...item, assistido: !item.assistido} : item))
  }
  //Quando filmes mudar, o React executa esse efeito
  useEffect (() => {
    //guarda o nome e o valor convertido em string
    localStorage.setItem("filmes", JSON.stringify(filmes))
  }, [filmes])
  //Quando a aplicação abre, se existir alguma coisa salva com essa chave, transforma e coloca esse array novamente no estado
  useEffect(() => {
    const dados = localStorage.getItem("filmes")
    if (dados !== null)
      setFilmes(JSON.parse(dados))
  }, [])

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
