import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from '../components/Navbar'
import Body from '../components/Body'
import Marquee from '../components/Update'
import EventCard from '../components/EventCard'
import Events from '../components/Events'
import EventsPreview from '../components/EventsPreview'
import Team from '../components/Team'
import TeamPreview from '../components/TeamPreview' // Import the new preview component
import { UserProvider } from '../utils/UserContext'
import Login from '../components/Login'
import ChangeUpdate from '../components/ChangeUpdate'
import EventForm from '../components/AddEvents'
import UpdateTeam from '../components/UpdateTeam'
import Footer from '../components/Footer'

// Home page component that includes all main sections
const HomePage = () => {
  return (
    <>
      <Body />
      <Marquee />
      <EventsPreview />
      <TeamPreview /> {/* Use TeamPreview instead of Team */}
      <Footer/>
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