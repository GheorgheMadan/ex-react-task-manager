import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function useTasks() {

    // recupero l'api dall file .env 
    const api = import.meta.env.VITE_API_URL

    // Array con tutte le task
    const [tasks, setTasks] = useState([]);

    // chiamata api per ricevere tutte le task dal api
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${api}/tasks`)
                const data = await res.json()
                setTasks(data)
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        })()
    }, [])

    // Funzione per aggiornare tutte le task 
    const addTask = async (newTask) => {

        let result;
        try {
            const res = await fetch(`${api}/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            })
            result = await res.json();
            const { success, message, task } = result
            if (success) {
                setTasks(prev => [...prev, task])
                alert('Task aggiunta con successo')
            }
        } catch (error) {
            console.error({ ...result, message: result.message });
            alert('Operazione fallita, riprova.')
        }
    }

    const navigate = useNavigate()

    const removeTask = async (taskId) => {
        const filtredTasks = tasks.filter(task => taskId !== task.id)
        let result
        try {
            const res = await fetch(`${api}/tasks/${taskId}`, {
                method: "DELETE"
            })
            result = await res.json()
            if (result.success) {
                setTasks(filtredTasks)
                navigate('/tasks-list')
                alert('Task eliminata con successo')
            }
            console.log(result);
        } catch (error) {
            if (!result.success) return alert(result.message)
        }
    }

    const updateTask = async (updatedTask, id) => {
        let result
        try {
            const res = await fetch(`${api}/tasks/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTask)
            })
            result = await res.json()
            const { success, task } = result
            if (success) {
                // mappo le task e aggiorno solo quella che ha l'id uguale a quello passato in questo modo non duplico le task
                setTasks(prev => prev.map(prevTask => prevTask.id === task.id ? task : prevTask));
            }
        } catch (error) {
            console.error(result.success, result.message);
        }
    }

    return { tasks, setTasks, addTask, removeTask, updateTask }
}