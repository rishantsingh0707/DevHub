import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import DashBoardPage from './pages/DashBoardPage.jsx';
import ProblemsPage from './pages/ProblemsPage.jsx';
import ProblemPage from './pages/ProblemPage.jsx';
import SessionPage from './pages/SessionPage.jsx';
import { useUser } from '@clerk/clerk-react';
import { useAxiosAuth } from './hooks/useAxiosAuth.js';
import { Toaster } from 'react-hot-toast';
function App() {
  useAxiosAuth();

  const { isSignedIn, isLoaded } = useUser()
  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        <Route path='/' element={!isSignedIn ? <HomePage /> : <Navigate to={'/dashboard'} />} />
        <Route path='/dashboard' element={isSignedIn ? <DashBoardPage /> : <Navigate to={'/'} />} />
        <Route path='/problems' element={isSignedIn ? <ProblemsPage /> : <Navigate to={'/'} />} />
        <Route path="/sessions/:id" element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />} />
        <Route path='/problem/:id' element={isSignedIn ? <ProblemPage /> : <Navigate to={'/'} />} />
      </Routes>
      <Toaster />
    </>
  );

}

export default App