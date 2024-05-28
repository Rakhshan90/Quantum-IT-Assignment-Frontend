import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Navbar from "./components/Navigation/Navbar"
import Dashboard from "./components/Dashboard"
import PrivateProtectedRoute from "./components/Navigation/Protected/PrivateProtectedRoute"
import PublicProtectedRoute from "./components/Navigation/Protected/PublicProtectedRoute"

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateProtectedRoute>
            <Dashboard />
          </PrivateProtectedRoute>} />
          <Route path="/login" element={<PublicProtectedRoute>
            <Login />
          </PublicProtectedRoute>} />
          <Route path="/signup" element={<PublicProtectedRoute>
            <Signup />
          </PublicProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
