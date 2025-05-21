import { GlobalContext } from "../context/GlobalContext"
import { useContext, useState, useMemo, useCallback } from "react"

// import del componente TaskRow
import TaskRow from "../components/TaskRow"

// funzione debounce generica
function debounce(callback, delay) {
    let timer;
    return (value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value);
        }, delay);
    };
}


export default function TaskList() {

    const { tasks } = useContext(GlobalContext)

    const [search, setSearch] = useState('')

    // ordinamento task, lo setto di default ordinate in base alla data
    const [sortBy, setSortBy] = useState('createdAt')
    // questo stato stabilisce l'ordinamento degli elementi in base al numero che contiene se 1 allora in ordine crescente se -1 allora in ordine decrescente
    const [sortOrder, setSortOrder] = useState(1)

    // creo la logica per l'ordinamento delle task, utilizzo [...tasks] così non modifico l'array originale e ne creo un altro 
    // se sortOrder è 1 allora saranno in ordine crescente se è -1 allora saranno in ordine decrescente
    const sortedTasks = useMemo(() => {
        const sort = [...tasks].sort((a, b) => {
            // se sortBy è title allora ordina in base al titolo * sortOrder serve per stabilire se è crescente o decrescente quindi moltiplicando per 1 o -1 a seconda del caso
            if (sortBy === 'title') return a[sortBy].localeCompare(b[sortBy]) * sortOrder
            // se sortBy è createAt allora ordina in base alla data di creazione 
            if (sortBy === 'createdAt') return (new Date(a[sortBy]) - new Date(b[sortBy])) * sortOrder
            // se sortBy è status allora ordina in base allo stato per avere un ordinamento personalizzato "To do" < "Doing" < "Done"
            if (sortBy === 'status') {
                // creo un oggetto che contiene i valori numerici per ogni stato 0 1 e 2 perchè in questo modo posso fare il confronto tra i vari stati
                const statusValue = { "To do": 0, "Doing": 1, "Done": 2 }
                // confronto i vari stati e moltiplico per sortOrder per stabilire se è crescente o decrescente
                return (statusValue[a.status] - statusValue[b.status]) * sortOrder
            }
        })
        const filteredSort = sort.filter(task => task.title.toLowerCase().includes(search.toLowerCase()))


        return filteredSort
    }, [tasks, sortBy, sortOrder, search])

    const debouncedFilter = useCallback(debounce(sortedTasks.filteredSort, 1000), [])


    return (
        <div>
            <h1>Tasks List</h1>
            <div className="container-form">
                <input type="text"
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Cerca..."
                />
            </div>
            <label>
                Ordina per:
                <select onChange={e => setSortBy(e.target.value)}>
                    <option value="createdAt">Data in ordine {sortOrder === 1 ? 'crescente' : 'decrescente'}</option>
                    <option value="title">Titolo in ordine {sortOrder === 1 ? 'crescente' : 'decrescente'}</option>
                    <option value="status">Stato in ordine {sortOrder === 1 ? 'crescente' : 'decrescente'}</option>
                </select>
            </label>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => setSortOrder(sortOrder === 1 ? -1 : 1)}>Nome</th>
                        <th onClick={() => setSortOrder(sortOrder === 1 ? -1 : 1)}>Stato</th>
                        <th onClick={() => setSortOrder(sortOrder === 1 ? -1 : 1)}>Data di creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTasks.map(task => <TaskRow key={task.id} task={task} />)}
                </tbody>
            </table>

        </div >
    )
}