import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import delle pagine principali 
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'

// import del layout principale 
import DefaultLayout from './layout/defaultLayout'

// import del contesto globale 
import { GlobalProvider } from './context/GlobalContext'

function App() {


  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path='tasks-list' element={<TaskList />} />
              <Route path='add-task' element={<AddTask />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
