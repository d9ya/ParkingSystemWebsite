import{BrowserRouter as Router, Routes,Route} from"react-router-dom";
import RegisterLogin from "./Pages/RegisterLogin";
import Dashboard from"./Pages/Dashboard.jsx";
import BookingPage from"./Pages/BookingPage.jsx";

function App() {
  

  return (
    <Router>
      
      <Routes>
        <Route path="/registerlogin" element={<RegisterLogin />} />
        <Route path="/userdashboard" element={<Dashboard />} />
        <Route path ="/booking" element={<BookingPage />} />
        
      </Routes>
      </Router>
  )
}

export default App;