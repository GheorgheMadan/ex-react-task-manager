import useTasks from "../hooks/useTasks"

export default function AddTask() {

    const { addTask, removeTask, updateTask, descriptionRef, optionRef, name, setName, errorTitle } = useTasks()

    return (
        <div>
            <h1>Aggiungi una nuova task</h1>
            <div>
                <form onSubmit={(e) => addTask(e)}>
                    <label>
                        <p>Inserisci il nome della task</p>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="nome"
                        />
                        {errorTitle && <span className="red">{errorTitle}</span>}
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
                    <button type="submit" disabled={errorTitle}>Aggiungi</button>
                </form>
            </div>
        </div>
    )
}