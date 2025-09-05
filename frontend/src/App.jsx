import { Routes, Route } from 'react-router-dom'
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

// Home page component that includes all main sections
const HomePage = () => {
  return (
    <>
      <Body />
      <Marquee />
      <div id="events">
        <Events />
      </div>
      <div id="team">
        <Team />
      </div>
    </>
  )
}

function App() {
  return (
    <UserProvider>
      <div>
        <Navbar />
        <Routes>
          {/* Home page with all main sections */}
          <Route path="/" element={<HomePage />} />
          
          {/* Individual pages */}
          <Route path="/events" element={<Events />} />
          <Route path="/team" element={<Team />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin routes */}
          <Route path="/admin/update" element={<ChangeUpdate />} />
          <Route path="/admin/add-event" element={<EventForm />} />
          <Route path="/admin/update-team" element={<UpdateTeam />} />
          
          {/* Catch-all route - redirects to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </UserProvider>
  )
}

export default App