import { useState, useEffect, useRef, useMemo } from "react";

export default function useTasks() {

    // recupero l'api dall file .env 
    const api = import.meta.env.VITE_API_URL

    // stato dell'input name 
    const [name, setName] = useState('')
    // gestione form con use ref
    const descriptionRef = useRef()
    const optionRef = useRef()
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


    // costante contenete simboli
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~"
    // verifico se ci sono caratteri speciali nel nome 
    const isIncludes = symbols.split('').some(symbol => name.includes(symbol))
    const errorTitle = useMemo(() => {
        if (!name.trim()) return 'Il campo nome non può essere vuoto.'
        if (isIncludes) return 'Il nome non può contenere simboli'
        return ''
    }, [name])


    // Funzione per aggiornare tutte le task 
    const addTask = async (e) => {

        e.preventDefault()

        const description = descriptionRef.current.value
        const option = optionRef.current.value

        if (errorTitle || !description.trim() || !option) {
            alert('Compilare tutti i campi')
            return
        }

        if (isIncludes) {
            alert('il nome contiene caratteri speciali')
            return
        }

        const newTask = {
            title: name,
            description: description,
            status: option
        }

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
            console.log(result);
            if (result.success) {
                setTasks([...tasks, newTask])
                alert('Task aggiunta con successo')
                setName('')
                descriptionRef.current.value = ''
                optionRef.current.value = ''
            }
        } catch (error) {
            console.error({ ...result, message: error });
            alert('Operazione fallita, riprova.')
        }
    }

    const removeTask = (id) => {
        console.log('Remove Task');
    }

    const updateTask = (id) => {
        console.log('update task');
    }

    return { tasks, setTasks, addTask, removeTask, updateTask, descriptionRef, optionRef, name, setName, errorTitle }
}