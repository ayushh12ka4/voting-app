import RegisterPage from './components/RegisterPage'
import { Route,Routes } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import VotePage from './components/VotePage'
import './App.css'

import Home from './components/Home'
import Nav from './components/Nav'
import ProfilePage from './components/ProfilePage'
import DashBoard from './components/DashBoard'

function App() {
  

  return (
    <div>
       <Nav/>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/register" element={<RegisterPage/>}/>
         <Route path="/login" element={<LoginPage/>} />
         <Route path="/profile" element={<ProfilePage/>} />
         <Route path="/dashboard" element={<DashBoard/>} />
         <Route path="/vote/:electionId" element={<VotePage />} />
       </Routes>
    </div>
    

  )
}

export default App
