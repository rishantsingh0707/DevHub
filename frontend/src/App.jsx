import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import DashBoardPage from './pages/DashBoardPage.jsx';
import ProblemsPage from './pages/ProblemsPage.jsx';
import ProblemPage from './pages/ProblemPage.jsx';
import { useUser } from '@clerk/clerk-react';

import { Toaster } from 'react-hot-toast';
/**
 * Application root component that conditionally renders routes based on the user's authentication state.
 *
 * Renders public and protected routes and a global Toaster; returns `null` while the authentication state is loading.
 * @returns {JSX.Element|null} The routed application UI when authentication state is available, or `null` while loading.
 */
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
      </Routes>

      <Toaster />
    </>
  );

}

export default App