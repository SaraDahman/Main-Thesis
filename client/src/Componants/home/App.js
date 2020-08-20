import React from 'react';
import './assets/styles.css';

import HeroBanner from './components/HeroBanner';
import Features from './components/Features';
import Meals from './components/Meals';
import './assets/styles.css';
import Footer from '../footer/footer.js';

export default function App() {
  return (
    <>
      <main>
        <HeroBanner />
        <Features />
        <Meals />
      </main>
      <Footer />
    </>
  );
}
