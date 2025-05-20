import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
// import delle pagine principali 
import TaskList from './pages/TaskList'
import AddTask from './pages/AddTask'
import TaskDetail from './pages/TaskDetail'

// import del layout principale 
import DefaultLayout from './layout/defaultLayout'

// import del contesto globale 
import { GlobalProvider } from './context/GlobalContext'

function App() {


  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path='/' element={<Navigate to='/tasks-list' />} />
              <Route path='/tasks-list' element={<TaskList />} />
              <Route path='/add-task' element={<AddTask />} />
              <Route path='/tasks-list/task/:id' element={<TaskDetail />} />
            </Route>
          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    </>
  )
}

export default App
