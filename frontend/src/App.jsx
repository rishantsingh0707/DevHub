import { useUser } from '@clerk/clerk-react';
import { Navigate, Route, Routes } from 'react-router';
import DashBoardPage from './pages/DashBoardPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProblemPage from './pages/ProblemPage.jsx';
import ProblemsPage from './pages/ProblemsPage.jsx';
import SessionsPage from './pages/SessionsPage.jsx';

import { Toaster } from 'react-hot-toast';
function App() {

  const { isSignedIn, isLoaded } = useUser()
  if (!isLoaded) return null;

  console.log(isSignedIn)
  return (
    <>
      <Routes>
        <Route path='/' element={!isSignedIn ? <HomePage /> : <Navigate to={'/dashboard'} />} />
        <Route path='/dashboard' element={isSignedIn ? <DashBoardPage /> : <Navigate to={'/'} />} />

        <Route path='/problems' element={isSignedIn ? <ProblemsPage /> : <Navigate to={'/'} />} />
        <Route path='/problem/:id' element={isSignedIn ? <ProblemPage /> : <Navigate to={'/'} />} />

        <Route path='/sessions/:id' element={isSignedIn ? <SessionsPage /> : <Navigate to={'/'} />} />
      </Routes>

      <Toaster />
    </>
  );

}

export default App