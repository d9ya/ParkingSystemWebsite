import{BrowserRouter as Router, Routes,Route} from"react-router-dom";
import RegisterLogin from "./Pages/RegisterLogin";
import Dashboard from"./Pages/Dashboard.jsx";
import BookingPage from"./Pages/BookingPage.jsx";
import PaymentPage from"./Pages/Payments.jsx";
import HistoryPage from "./Pages/History.jsx";
import Settings from "./Pages/Settings.jsx";

function App() {
  

  return (
    <Router>
      
      <Routes>
        <Route path="/registerlogin" element={<RegisterLogin />} />
        <Route path="/userdashboard" element={<Dashboard />} />
        <Route path ="/booking" element={<BookingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<Settings />} />
        
      </Routes>
      </Router>
  )
}

export default App;