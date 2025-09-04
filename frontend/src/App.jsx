import { useState } from 'react'

import './App.css'
import Navbar from '../components/Navbar'
import Body from '../components/Body'
import Marquee from '../components/Update'

function App() {

  return (
    <div>
      <Navbar/>
      <Body />
      <Marquee />
    </div>
  )
}

export default App
