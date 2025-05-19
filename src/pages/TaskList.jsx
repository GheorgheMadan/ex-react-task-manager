import { GlobalContext } from "../context/GlobalContext"
import { useContext } from "react"

export default function TaskList() {

    const { tasks } = useContext(GlobalContext)

    console.log(tasks);


    return (
        <h1>Pagina della lista delle task</h1>

    )
}