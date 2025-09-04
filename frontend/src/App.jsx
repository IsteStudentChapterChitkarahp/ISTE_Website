import { useState } from 'react'

import './App.css'
import Navbar from '../components/Navbar'
import Body from '../components/Body'
import Marquee from '../components/Update'
import EventCard from '../components/EventCard'
import Events from '../components/Events'
import { UserProvider } from '../utils/UserContext'
import Team from '../components/Team'


function App() {

  return (
    <div>
      <UserProvider>
      <Navbar/>
      {/* <Body /> */}
      {/* <Marquee /> */}
      {/* <Events /> */}
      <Team/>
      </UserProvider>
    </div>
  )
}

export default App
