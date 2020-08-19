import React from 'react';
import './assets/styles.css';
import Navbar from './components/Navbar';

import HeroBanner from './components/HeroBanner';
import Features from './components/Features';
import Meals from './components/Meals';

// import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      {/* <Navbar /> */}
      <main>
        <HeroBanner />
        <Features />
        <Meals />
      </main>
      {/* <Footer /> */}
    </>
  );
}
