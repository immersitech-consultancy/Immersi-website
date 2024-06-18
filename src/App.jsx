import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contacts from "./components/Contact";
import Services from "./components/Services";
import Navbar from "./components/Navbar";
import CanvasScene from "./components/CanvasScene";


const Root = () => {
  return (
    <div className="relative">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CanvasScene />} />
          <Route path="/contact" element={<Contacts/>} />
          <Route path='/services' element={<Services/>}/>
        </Routes>
      </Router>
    </div>
  );
};







export default Root;
