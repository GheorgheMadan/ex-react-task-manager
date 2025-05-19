import { useRef, useState } from "react"

export default function AddTask() {

    const [name, setName] = useState('')
    const descriptionRef = useRef()
    const optionRef = useRef()
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~"

    // verifico se ci sono caratteri speciali nel nome 
    const isIncludes = symbols.split('').some(symbol => name.includes(symbol))
    console.log(isIncludes);

    const handleSubmit = (e) => {
        e.preventDefault()

        const description = descriptionRef.current.value
        const option = optionRef.current.value

        if (!name.trim() || !description.trim() || !option) {
            alert('Compilare tutti i campi')
            return
        }

        if (isIncludes) {
            alert('il nome contiene caratteri speciali')
        }
        console.log(`nome: ${name}, descrizione: ${description}. option: ${option}`);


    }

    return (
        <div>
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
                        {isIncludes && <span className="red">Il nome deve contenere solo caratteri alfanumerici</span>}
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
                    <button type="submit">Aggiungi</button>
                </form>
            </div>
        </div>
    )
}