import { NavLink } from "react-router-dom"

export default function Header() {
    return (
        <header>
            <h1>Task Manager Avanzato</h1>
            <div>
                <NavLink to='/tasks-list'>Tasks List</NavLink>
                <NavLink to='/add-task'>Add Task</NavLink>
            </div>
        </header>
    )
}