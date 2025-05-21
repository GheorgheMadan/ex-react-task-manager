import { useParams } from "react-router-dom"
import { useContext, useMemo, useState, useRef, useEffect } from "react"
import { GlobalContext } from "../context/GlobalContext"
import Modal from "../components/Modal"
import EditTaskModal from "../components/EditTaskModal"

export default function TaskDetail() {

    // imposto formRef per poter accedere al submit del form anche se il button di invio si trova fuori 
    const formRef = useRef()

    // Importo tutte le tasks e la funzione removeTask dal contesto globale
    const { tasks, removeTask, updateTask } = useContext(GlobalContext)

    // estrappolo l'id dal url 
    const { id } = useParams()

    // Con find cerco la task che ha l'id uguale a quello estrappolato dal url utilizzando useMemo per evitare di rieseguire la funzione ogni volta che il componente viene renderizzato 
    const task = useMemo(() => {
        return tasks.find(t => t.id.toString() === id)
    }, [id, tasks])

    // creo lo stato per la modale di conferma eliminazione
    const [show, setShow] = useState(false)

    // creo lo stato per la modale di modifica task
    const [show2, setShow2] = useState(false)

    // creo lo stato del form di modifica 
    const [formTitle, setFormTitle] = useState('')
    const [formDescription, setFormDescription] = useState('')
    const [formStatus, setFormStatus] = useState('')

    // Assegno al form come value i dati che contiene la task in modo da poter avere gia i campi pre compilati
    useEffect(() => {
        if (task && show2) {
            setFormTitle(task.title)
            setFormDescription(task.description)
            setFormStatus(task.status)
        }
    }, [show2, task])

    // costante contenete simboli
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~"
    // verifico se ci sono caratteri speciali nel nome 
    const isIncludes = symbols.split('').some(symbol => formTitle.includes(symbol))

    // Controllo i form che ci siano e che non ci sia lo spazio
    const errorForm = useMemo(() => {
        if (!formTitle.trim() || !formDescription.trim() || !formStatus) return 'I campi devono essere tutti compilati'
        // controllo che il nome non contenga simboli speciali
        if (isIncludes) return 'Il nome non può contenere simboli'
        return ''
        // tutto cio verrà eseguito ogni volta che cambiano i campi
    }, [formTitle, formDescription, formStatus, isIncludes])

    // funzione per gestire l'invio della task aggiornata
    async function handleUpdate(e) {
        e.preventDefault()
        if (errorForm) {
            return
        }
        // recupero l'id della task
        const id = task?.id
        // creo l'oggetto completo che riceverà il be
        const updatedTask = {
            title: formTitle,
            description: formDescription,
            status: formStatus
        }
        try {
            await updateTask(updatedTask, id)
            // Chiudo la modale soltanto quando tutto va a buon fine
            setShow2(false)
            alert('Task modificata con successo')
        } catch (error) {
            console.error(error);
            alert('Operazione fallita, riprova!')
        }
    }

    return (
        <div className="container-detail" key={task?.id}>
            <h2>{task?.title}</h2>
            <p>{task?.description}</p>
            <div>
                <span className={`${task?.status === 'To do' ? 'red' : task?.status === 'Doing' ? 'orange' : 'green'}`}>{task?.status}</span>
            </div>
            <span>Data creazione: {new Date(task?.createdAt).toLocaleDateString()}</span>

            {/* Cliccando su elimina task aparirà la modale con la richiesta di conferma */}
            <button onClick={() => setShow(true)}>Elimina Task</button>
            <button onClick={() => setShow2(true)}>Modifica Task</button>
            {/* Passo le prop personalizzate in modo da poter riutilizzare la modale */}
            <Modal
                title='Vuoi davvero eliminare questa task?'
                content='Questa operazione rimuoverà definitivamente la task. Procedere?'
                confirmText='Elimina'
                show={show}
                // passo la funzione onConfirm che verrà eseguita quando l'utente clicca su elimina allora la modale si chiude e viene eseguita la funzione removeTask passata dal contesto globale
                onConfirm={() => {
                    setShow(false)
                    removeTask(task?.id)
                }}
                onClose={() => setShow(false)}
            />

            <EditTaskModal
                show={show2}
                onClose={() => setShow2(false)}
                title='Modifica Task'
                confirmText='Salva'
                onConfirm={() => {
                    formRef.current.requestSubmit()
                }}
                content={
                    <form className="container-form"
                        ref={formRef}
                        onSubmit={(e) => handleUpdate(e)}
                    >
                        <label>
                            Inserisci il nuovo nome
                            <input
                                type="text"
                                value={formTitle}
                                onChange={e => setFormTitle(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Inserisci una nuova descrizione
                            <textarea
                                type="text"
                                value={formDescription}
                                onChange={e => setFormDescription(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Inserisci il nuovo nome
                            <select
                                type="text"
                                onChange={e => setFormStatus(e.target.value)}
                                value={formStatus}
                                required
                            >
                                <option value="">-- Seleziona --</option>
                                <option value='To do'>To do</option>
                                <option value='Doing'>Doing</option>
                                <option value="Done">Done</option>
                            </select>
                        </label>
                    </form>}
            />
        </div>
    )
}