import React from 'react';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Auth Demo</h1>
      <Register />
      <hr />
      <Login />
    </div>
  );
}

export default App;
