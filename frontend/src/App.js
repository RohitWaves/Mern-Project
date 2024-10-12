import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Footer from './components/Footer';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
          <Routes>
             <Route path="/" element={<h1>Produts Listing Component</h1>}/>
             <Route path="/add" element={<h1>Add Products Component</h1>} />
             <Route path="/update" element={<h1>Update Products Component</h1>} />
             <Route path="/logout" element={<h1>Logout  Component</h1>} />
             <Route path="/profile" element={<h1>Profile Component</h1>} />
          </Routes>
       </BrowserRouter>
       <Footer />
    </div>
  );
}

export default App;
