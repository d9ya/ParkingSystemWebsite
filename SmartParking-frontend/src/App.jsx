import{BrowserRouter as Router, Routes,Route} from"react-router-dom";
import RegisterLogin from "./Pages/RegisterLogin";
import Dashboard from"./Pages/Dashboard.jsx";


function App() {
  

  return (
    <Router>
      
      <Routes>
        <Route path="/registerlogin" element={<RegisterLogin />} />
        <Route path="/userdashboard" element={<Dashboard />} />
        
      </Routes>
      </Router>
  )
}

export default App;