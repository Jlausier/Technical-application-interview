// frontend/src/components/Header.js

import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="logo">Tacos & Meals</div>
      <nav className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
