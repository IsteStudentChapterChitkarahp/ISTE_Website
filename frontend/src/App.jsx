import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from '../components/Navbar'
import Body from '../components/Body'
import Marquee from '../components/Update'
import Events from '../components/Events'
import EventsPreview from '../components/EventsPreview'
import Team from '../components/Team'
import Login from '../components/Login'
import ChangeUpdate from '../components/ChangeUpdate'
import EventForm from '../components/AddEvents'
import UpdateTeam from '../components/UpdateTeam'
import Footer from '../components/Footer'
import About from '../components/About'
import ProtectedRoute from '../components/ProtectedRoute'
import { UserProvider } from '../utils/UserContext'

// Home page component
const HomePage = () => {  
  return (
    <>
      <Body />
      <Marquee />
      <EventsPreview />
    </>
  )
}

function App() {

  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* Main content */}
        <div className="flex-grow">
         {/* <Suspense fallback={<Shimmer />}> */}
          <Routes>
            {/* Home page */}
            <Route path="/" element={<HomePage />} />

            {/* Other pages */}
            <Route path="/events" element={<Events />} />
            <Route path="/team" element={<Team />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />

            {/* Admin routes */}
            
             <>
             <Route path="/admin/update" element={<ProtectedRoute component={<ChangeUpdate />} />} />
            <Route path="/admin/add-event" element={<ProtectedRoute component={<EventForm />} />} />
            <Route path="/admin/update-team" element={<ProtectedRoute component={<UpdateTeam />} />} />
            </>

            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
           {/* </Suspense> */}
        </div>

        {/* Footer always visible */}
        <Footer />
      </div>
    </UserProvider>
  )
}

export default App
