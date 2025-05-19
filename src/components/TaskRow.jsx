import { memo } from "react";

const TaskRow = memo(({ task }) => {

    const isToDo = task.status === 'To do'
    const isDoing = task.status === 'Doing'

    return (
        <>
            <tr>
                <td>{task.title}</td>
                <td className={`${isToDo ? 'red' : isDoing ? 'orange' : 'green'}`}>{task.status}</td>
                <td>{task.createdAt}</td>
            </tr>
        </>
    )
})

export default TaskRow