import { Navigate, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import DashBoardPage from './pages/DashBoardPage.jsx';
import { useUser } from '@clerk/clerk-react';
import ProblemsPage from './pages/ProblemsPage.jsx';
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
      </Routes>

      <Toaster />
    </>
  );

}

export default App