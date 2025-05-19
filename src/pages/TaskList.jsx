import { GlobalContext } from "../context/GlobalContext"
import { useContext } from "react"

// import del componente TaskRow
import TaskRow from "../components/TaskRow"

export default function TaskList() {

    const { tasks } = useContext(GlobalContext)

    return (
        <div>
            <h1>Tasks List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => <TaskRow key={task.id} task={task} />)}
                </tbody>
            </table>

        </div >
    )
}