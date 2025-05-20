
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export default function TaskDetail() {

    const { tasks, removeTask } = useContext(GlobalContext)

    const { id } = useParams()
    const task = tasks.find(t => t.id.toString() === id)

    return (
        <div className="container-detail" key={task?.id}>
            <h2>{task?.title}</h2>
            <p>{task?.description}</p>
            <div>
                <span className={`${task?.status === 'To do' ? 'red' : task?.status === 'Doing' ? 'orange' : 'green'}`}>{task?.status}</span>
            </div>
            <span>Data creazione: {new Date(task?.createdAt).toLocaleDateString()}</span>
            <button onClick={() => removeTask(task?.id)}>Elimina Task</button>
        </div>
    )
}