import React from 'react';
import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Projects from './pages/Projects';

const Navigation = () => {
    const location = useLocation();
    
    // Don't show the main global nav on the Home page since it has its own styled nav
    // Or we can create a unified nav. Let's stick to the specific designs provided.
    // The "Home" design (Japanese) has navigation built-in.
    // The "Blog" design has a nav header.
    // The "Projects" design has a retro nav.
    // We will let each page handle its own navigation visuals, but they will link to the routes.
    
    return null; 
};

export default function App() {
  return (
    <HashRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </HashRouter>
  );
}