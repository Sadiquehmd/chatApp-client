import React, { useState, useEffect, useContext } from 'react';

import 'tailwindcss/tailwind.css';
import './App.css'; // Ensure this imports Tailwind and DaisyUI
import { LoginForm } from './components/login';
import { Chat } from './components/chat';
import { DataContext } from './store/store';

// Initialize Feathers client


const App = () => {
const {isLoggedIn}=useContext(DataContext)

  return (
    <div>
      {!isLoggedIn ? (
        <LoginForm />
      ) : (
        <Chat/>
      )}
    </div>
  );
};

export default App;
