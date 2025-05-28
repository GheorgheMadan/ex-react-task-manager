import { createContext } from "react";

// Creo il contesto e lo esporto in modo da poter estrapolare i dati nei altri file dell'app
export const GlobalContext = createContext();

import useTasks from "../hooks/useTasks";

// creo il provider, utilizzo children per passare i dati al contesto
export const GlobalProvider = ({ children }) => {

    const { tasks, setTasks, addTask, removeTask, updateTask, removeMultipleTasks } = useTasks()

    return (
        <GlobalContext.Provider value={{ tasks, setTasks, addTask, removeTask, updateTask, removeMultipleTasks }}>
            {children} {/* QUA VIENE INSERITO IL COMPONENTE app.jsx */}
        </GlobalContext.Provider>
    )
}