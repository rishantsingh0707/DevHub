import React from 'react'
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import { useUser } from '@clerk/clerk-react';
import ProblemsPage from './pages/ProblemsPage.jsx';
import { Toaster } from 'react-hot-toast';
function App() {

  const { isSignedIn } = useUser()
  console.log(isSignedIn)
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/problems' element={isSignedIn ? <ProblemsPage /> : <HomePage />} />
      </Routes>

      <Toaster/>
    </>
  );

}

export default App