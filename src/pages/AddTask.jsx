import useTasks from "../hooks/useTasks"
import { useContext, useRef, useMemo, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
export default function AddTask() {

    const { tasks, setTasks, addTask, removeTask, updateTask } = useContext(GlobalContext)

    // stato dell'input name 
    const [name, setName] = useState('')
    // gestione form con use ref
    const descriptionRef = useRef()
    const optionRef = useRef()

    // costante contenete simboli
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~"
    // verifico se ci sono caratteri speciali nel nome 
    const isIncludes = symbols.split('').some(symbol => name.includes(symbol))
    const errorTitle = useMemo(() => {
        if (!name.trim()) return 'Il campo nome non può essere vuoto.'
        if (isIncludes) return 'Il nome non può contenere simboli'
        return ''
    }, [name])

    const handleSubmit = async (e) => {
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
        try {
            await addTask(newTask)
            setName('')
            descriptionRef.current.value = ''
            optionRef.current.value = ''
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <div className="container-form">
            <h1>Aggiungi una nuova task</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>Inserisci il nome della task</p>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="nome"
                        />
                        {errorTitle && <span className="error">{errorTitle}</span>}
                    </label>
                    <label>
                        <p>Inserisci una descrizione</p>
                        <textarea
                            placeholder="Descrizione.."
                            ref={descriptionRef}
                        />
                    </label>
                    <label>
                        <p>Seleziona</p>
                        <select
                            ref={optionRef}>
                            <option value="">-- Scegli un'opzione --</option>
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </label>
                    <button type="submit" disabled={errorTitle} className="submitForm">Aggiungi</button>
                </form>
            </div>
        </div>
    )
}