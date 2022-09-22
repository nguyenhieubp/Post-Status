import "./App.css";
import Home from "./page/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App ">
      <div className="md:px-[36rem] sm:px-2 h-[100%] py-[1.6rem]">
        <Router>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
