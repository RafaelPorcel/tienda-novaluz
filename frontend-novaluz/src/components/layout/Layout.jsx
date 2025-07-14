import React from 'react';
import Nav from './Nav';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="app">
      <Nav />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout; 