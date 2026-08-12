import "./FilmeCard.css"

export default function FilmeCard ({nome, genero, assistido, id, remove, alternarAssistido}) {
    return (
        <div className="info">
                <input type="checkbox" checked={assistido} onChange={() => alternarAssistido(id)}/>
                <p>{nome}</p>
                <p>{genero}</p>
                <button onClick={() => remove(id)} >X</button>
              </div>   
    )
}