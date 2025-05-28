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
        const isTaskExist = tasks.some(t => t.title === newTask.title)
        if (isTaskExist) {
            alert('Esiste già una task con questo nome ')
            throw new Error('Esiste già una task con questo nome ')
        }
        const res = await fetch(`${api}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        })
        const result = await res.json();
        const { success, message, task } = result
        // se success è false allora creo il nuovo errore a cui passo il messaggio 
        if (!success) throw new Error(message)

        // altrimenti vado a vanti 
        setTasks(prev => [...prev, task])
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

        const areName = tasks.some(task => task.id !== id && task.title === updatedTask.title)

        if (areName) {
            alert('Task già esistente')
            throw new Error('Task già esistente')
        }

        const res = await fetch(`${api}/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTask)
        })
        const result = await res.json()
        const { success, task, message } = result
        // se success è false allora creo l'errore nuovo 
        if (!success) throw new Error(message)

        // mappo le task e aggiorno solo quella che ha l'id uguale a quello passato in questo modo non duplico le task
        setTasks(prev => prev.map(prevTask => prevTask.id === task.id ? task : prevTask));
    }

    const removeMultipleTasks = async (selectedTasks) => {

        const promises = selectedTasks.map(id =>
            fetch(`${api}/tasks/${id}`, { method: 'DELETE' })
                .then(res => res.json())
                .catch(error => console.error(error))
        )
        // passo gli array di tutte le fetch alla promise
        const results = await Promise.allSettled(promises)

        // creo l'array vuoto dove andranno le promise andate a buon fine 
        const fullFieldDeletions = []
        // creo l'array vuoto dove andranno le promise fallite 
        const rejectedDeletions = []

        results.forEach((result, index) => {
            // task id è l'id della task che è stato selezionato che la prendo tramite l'indice dell'array selectedTasks
            const taskId = selectedTasks[index]
            // se lo status della promise è fullfilled e il valore di success è true allora la pusho dentro l'array fullFieldDeletions
            if (result.status === 'fulfilled' && result.value.success) {
                fullFieldDeletions.push(taskId)
                // altrimenti se lo status della promise è rejected allora la pusho dentro l'array rejectedDeletions
            } else {
                rejectedDeletions.push(taskId)
            }
        })

        // se l'array fullFieldDeletions ha degli elementi allora filtro le task e rimuovo le task che hanno l'id presente nell'array fullFieldDeletions 
        if (fullFieldDeletions.length > 0) {
            setTasks(prev => prev.filter(task => !fullFieldDeletions.includes(task.id)))
        }
        // se l'array rejectedDeletions ha degli elementi allora lancio un errore con gli id delle task che non sono state eliminate
        if (rejectedDeletions.length > 0) {
            throw new Error(`Errore nel eliminazione delle task con id: ${rejectedDeletions.join(", ")}`)
        }
    }

    return { tasks, setTasks, addTask, removeTask, updateTask, removeMultipleTasks }
}