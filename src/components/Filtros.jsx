export default function Filtros({ filtroStatus, filtroGenero, setFiltroStatus, setFiltroGenero, filmes }) {
    return (
        <>
            <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
                <option value="todos">Todos</option>
                <option value="assistidos">Assistidos</option>
                <option value="naoAssistidos">Não assistidos</option>
            </select>
            <select value={filtroGenero} onChange={(e) => setFiltroGenero(e.target.value)}>
                <option value="todos">Todos</option>
                {filmes.map((item) => (
                    <option key={item.id} value={item.genero}>{item.genero}</option>
                ))}
            </select>
        </>
    )
}