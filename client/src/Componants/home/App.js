import React from 'react';
import './assets/styles.css';

import HeroBanner from './components/HeroBanner';
import Features from './components/Features';
import Meals from './components/Meals';
import './assets/styles.css';
import Footer from '../footer/footer.js';
import Test from './components/test';

export default function App() {
  return (
    <>
      <main>
        <HeroBanner />
        <Features />
        <Meals />
        {/* <Test /> */}
      </main>
      <Footer />
    </>
  );
}
