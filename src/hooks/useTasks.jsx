import { useState, useEffect } from "react";

export default function useTasks() {

    // recupero l'api dall file .env 
    const api = import.meta.env.VITE_API_URL


    const [tasks, setTasks] = useState([]);

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

    const addTask = () => {
        console.log('Add task');
    }

    const removeTask = (id) => {
        console.log('Remove Task');
    }

    const updateTask = (id) => {
        console.log('update task');
    }

    return { tasks, setTasks, addTask, removeTask, updateTask }
}