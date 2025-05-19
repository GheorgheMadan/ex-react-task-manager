import { createContext, useState, useEffect } from "react";

// Creo il contesto e lo esporto in modo da poter estrapolare i dati nei altri file dell'app
export const GlobalContext = createContext();

// recupero l'api dall file .env 
const api = import.meta.env.VITE_API_URL

// creo il provider, utilizzo children per passare i dati al contesto
export const GlobalProvider = ({ children }) => {
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

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>
            {children} {/* QUA VIENE INSERITO IL COMPONENTE app.jsx */}
        </GlobalContext.Provider>
    )
}