import{BrowserRouter as Router, Routes,Route} from"react-router-dom";
import RegisterLogin from "./Pages/RegisterLogin";


function App() {
  

  return (
    <Router>
      
      <Routes>
        <Route path="/regiterlogin" element={<RegisterLogin />} />
      </Routes>
      </Router>
  )
}

export default App;