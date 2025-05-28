import { memo } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
const TaskRow = memo(({ task, checked, onToggle }) => {

    const isToDo = task.status === 'To do'
    const isDoing = task.status === 'Doing'

    return (
        <>
            <tr>
                <td>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggle(task.id)}
                    />
                </td>
                <td>
                    <Link to={`task/${task.id}`}>{task.title}</Link>
                </td>
                <td className={`${isToDo ? 'red' : isDoing ? 'orange' : 'green'}`}>{task.status}</td>
                <td>{dayjs(task.createdAt).format('DD/MM/YYYY')}</td>
            </tr>

        </>
    )
})

export default TaskRow