import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contacts from "./components/Contact";
import Services from "./components/Services";
import Navbar from "./components/Navbar";
import Home from "./components/Home";



const Root = () => {
  return (
    <div className="relative">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/services' element={<Services/>}/>
          <Route path="/contact" element={<Contacts/>} />   
        </Routes>
      </Router>
    </div>
  );
};







export default Root;
