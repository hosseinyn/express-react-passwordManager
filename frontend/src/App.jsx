import { BrowserRouter , Routes , Route } from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Passwords from "./pages/Passwords"
import ChangePassword from "./pages/ChangePassword"
import Logout from "./pages/Logout"

function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/passwords" element={<Passwords />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/change-password" element={<ChangePassword />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Routes>
    <Footer />
    </BrowserRouter>  
  )
}

export default App
