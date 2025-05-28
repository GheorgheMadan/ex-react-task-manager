import { GlobalContext } from "../context/GlobalContext"
import { useContext, useState, useMemo, useCallback, useEffect } from "react"

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

    const { tasks, removeMultipleTasks } = useContext(GlobalContext)

    const [search, setSearch] = useState('')

    // ordinamento task, lo setto di default ordinate in base alla data
    const [sortBy, setSortBy] = useState('createdAt')
    // questo stato stabilisce l'ordinamento degli elementi in base al numero che contiene se 1 allora in ordine crescente se -1 allora in ordine decrescente
    const [sortOrder, setSortOrder] = useState(1)

    // stato per le task selezionate 
    const [selectedIds, setSelectedTaskIds] = useState([])

    // Per evitare render inutili, ritardo di un secondo la ricerca dell'utente passando alla funzione debounce il setSearch in modo che cosi setSearch riceva dopo un secondo l'input dell'utente
    const debouncedSearch = useCallback(debounce(setSearch, 1000), [])

    // se sortOrder è uguale a 1 mostrerò la frcccia in giu quindi in ordine crescente altrimenti in ordine decrescente 
    const arrowIcon = sortOrder === 1 ? '🠗' : '🠕'

    // creo una funzione che gestisca ogni singola colonna in parte 
    const handleSort = (filed) => {
        // se sortby è uguale alla stringa passata alla funzione
        if (sortBy === filed) {
            // allora modifico il sortOrder, lo moltiplico per * -1 cosi 1 * -1 ritorna -1 e cambia il verso della sort in ordine decrescente 
            setSortOrder(prev => prev * - 1)
            // altrimenti 
        } else {
            // se viene cliccato di nuovo il sortOrder verrà reimpostato a 1 e quindi cambierà il verso della sort in ordine crescente
            setSortBy(filed)
            setSortOrder(1)
        }
    }
    // creo la logica per l'ordinamento delle task, utilizzo [...tasks] così non modifico l'array originale e ne creo un altro 
    // se sortOrder è 1 allora saranno in ordine crescente se è -1 allora saranno in ordine decrescente
    const sortedTasks = useMemo(() => {
        const sort = [...tasks].sort((a, b) => {
            // definisco il comparison, che poi nel return verrà multiplicato per sortOrder per definire l'ordine 
            let comparison

            // se sortBy è title allora ordina in base al titolo 
            if (sortBy === 'title') {
                // comparison prenderà questo ordine 
                comparison = a.title.localeCompare(b.title)

                // se sortBy è createAt allora ordina in base alla data di creazione 
            } else if (sortBy === 'createdAt') {
                // li definisco in delle variabile in modo da aggiungere .getTime()
                const dateA = new Date(a.createdAt)
                const dateB = new Date(b.createdAt)
                // comparison prenderà questo ordine, .getTime() viene aggiunto per avere una maggiore precisione dato che prende i milisecondi 
                comparison = dateA.getTime() - dateB.getTime()

                // se sortBy è status allora ordina in base allo stato per avere un ordinamento personalizzato "To do" < "Doing" < "Done"
            } else if (sortBy === 'status') {
                // creo un array che contiene i stati delle task
                const statusValue = ["To do", "Doing", "Done"]
                // attraverso l'indexOf() mi prendo l'indice di statusValue dato che nelle paretnesi di indexOf gli definisco a.status   
                const statusA = statusValue.indexOf(a.status)
                const statusB = statusValue.indexOf(b.status)
                // confronto gli stati 
                comparison = statusA - statusB
            }
            return comparison * sortOrder
        })
        // filtro i risultati della ricerca dell'utente mantenendo sort in modo da poter comunque ordinare a preferenza i risultati della ricerca
        const filteredSort = sort.filter(task => task.title.toLowerCase().includes(search.toLowerCase()))


        return filteredSort
    }, [tasks, sortBy, sortOrder, search])


    function toggleSelection(taskId) {
        // prendo il vecchio array quindi oldArrayId che corrisponde a selectedIds, verifico se esiste gia l'id che viene passato alla funzione (taskId) allora lo rimuovo
        // altrimenti lo aggiungo 
        setSelectedTaskIds(oldArrayId => oldArrayId.includes(taskId) ? oldArrayId.filter(id => id !== taskId) : [...oldArrayId, taskId])
    }

    const handleDeleteSelected = async () => {
        try {
            await removeMultipleTasks(selectedIds)
            alert("Task eliminate con successo")
            setSelectedTaskIds([])
        } catch (error) {
            console.error(error);
            alert(error.message)
        }
    }



    return (
        <div>
            <h1>Tasks List</h1>
            <div className="container-form">
                <input type="text"
                    // qua passo il valore dell'input alla debouncedSearch che alla sua volta passerà il valore a setSearch soltanto dopo un secondo 
                    onChange={e => debouncedSearch(e.target.value)}
                    placeholder="Cerca..."
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {/* se sortBy viene ordinato per titolo allora mostro l'arrowIcon alla colonna titolo */}
                        <th onClick={() => handleSort('title')}>Nome {sortBy === 'title' && arrowIcon} </th>
                        <th onClick={() => handleSort('status')}>Stato {sortBy === 'status' && arrowIcon}</th>
                        <th onClick={() => handleSort('createdAt')}>Data di creazione {sortBy === 'createdAt' && arrowIcon}</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTasks.map(task => <TaskRow
                        key={task.id}
                        task={task}
                        checked={selectedIds.includes(task.id)} // verifico se è selezionata la task
                        onToggle={toggleSelection} />)}
                </tbody>
            </table>
            {selectedIds.length > 0 && <button onClick={() => handleDeleteSelected()}>Elimina task selezionate</button>}
        </div >
    )
}