import './styles.css'
import Locations from "./components/locations/Locations"
import Categories from "./components/catagories/Categories"
import News from './components/news/News'
import Homepage from './components/Homepage/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login/Login';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Homepage/>}/>
        <Route path="/news" element={<News/>}/>
        <Route path="/locations" element={<Locations/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  )
}
