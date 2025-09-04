import { useState } from 'react'

import './App.css'
import Navbar from '../components/Navbar'
import Body from '../components/Body'
import Marquee from '../components/Update'
import EventCard from '../components/EventCard'
import Events from '../components/Events'

function App() {

  return (
    <div>
      <Navbar/>
      {/* <Body /> */}
      {/* <Marquee /> */}
      <Events />
    </div>
  )
}

export default App
