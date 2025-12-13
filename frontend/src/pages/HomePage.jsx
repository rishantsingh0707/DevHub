import React from 'react';
import { 
  SignInButton, 
  SignOutButton, 
  SignedOut, 
  SignedIn, 
  UserButton 
} from '@clerk/clerk-react';

function HomePage() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="btn btn-primary">Sign In</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton>
          <button className="btn btn-secondary">Sign Out</button>
        </SignOutButton>

        <UserButton />
      </SignedIn>

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Interview Platform</h1>
        <p className="mb-4">Prepare for your interviews with our curated questions and resources.</p>
      </div>
    </>
  );
}

export default HomePage;
