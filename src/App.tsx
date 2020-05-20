import React from 'react';
import './App.css';
import Product from './components/Product/Product';
import Alerts from './components/layout/alerts';

function App() {
  return (
    <div className='App'>
      <Alerts />
      <Product />
    </div>
  );
}

export default App;
