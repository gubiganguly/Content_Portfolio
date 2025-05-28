import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FPVVideos from './pages/FPVVideos';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Services from './sections/Services';
import About from './sections/About';
import Portfolio from './sections/Portfolio';
import CallToAction from './sections/CallToAction';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fpv-videos" element={<FPVVideos />} />
    </Routes>
  );
}

export default App;