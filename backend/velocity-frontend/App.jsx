import React from 'react';
import Header from './components/Header';
import Hero from './Hero';
import Services from './Services';
import Footer from './components/Footer';
import './index.css';
import HomePage from './HomePage';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Services />
      </main>
      <Footer />
    </div>
  );
}

export default App;