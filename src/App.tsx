import Home from './pages/Home.js'
import { Route, Routes } from 'react-router-dom';
import "./App.scss"


function App() {
  return (
    <>
      <Routes>
        <Route path='/test-tableUsers' element={<Home />}></Route>
      </Routes>
    </>
  )
}

export default App
