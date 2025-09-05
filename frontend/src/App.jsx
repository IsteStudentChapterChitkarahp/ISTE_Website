import { useState } from 'react'

import './App.css'
import Navbar from '../components/Navbar'
import Body from '../components/Body'
import Marquee from '../components/Update'
import EventCard from '../components/EventCard'
import Events from '../components/Events'
import { UserProvider } from '../utils/UserContext'
import Team from '../components/Team'
import Login from '../components/Login'
import ChangeUpdate from '../components/ChangeUpdate'
import EventForm from '../components/AddEvents'
import UpdateTeam from '../components/UpdateTeam'


function App() {

  return (
    <div>
      <UserProvider>
      <Navbar/>
      <Body />
      <Marquee />
      <Events />
      <Team/>
      <Login />
      {/* <ChangeUpdate /> */}
      {/* <EventForm/> */}
      <UpdateTeam />
      </UserProvider>
    </div>
  )
}

export default App
