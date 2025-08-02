import { BrowserRouter , Routes , Route } from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Passwords from "./pages/Passwords"

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
    </Routes>
    <Footer />
    </BrowserRouter>  
  )
}

export default App
