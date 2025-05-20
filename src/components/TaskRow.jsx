import { memo } from "react";
import { Link } from "react-router-dom";
const TaskRow = memo(({ task }) => {

    const isToDo = task.status === 'To do'
    const isDoing = task.status === 'Doing'

    return (
        <>
            <tr>
                <td><Link to={`task/${task.id}`}>{task.title}</Link></td>
                <td className={`${isToDo ? 'red' : isDoing ? 'orange' : 'green'}`}>{task.status}</td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
            </tr>
        </>
    )
})

export default TaskRow