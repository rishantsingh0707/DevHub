import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { BookOpenIcon, LayoutDashboardIcon, Sparkles } from 'lucide-react'
import { UserButton } from '@clerk/clerk-react';

function Navbar() {

    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    return (
        <nav className='bg-base-100/80 backdrop-blur-md sticky top-0 z-50 border-b border-primary/20 shadow-lg '>

            <div className='max-w-7xl mx-auto p-4 flex justify-between items-center'>
                {/* LOGO */}
                <Link to={"/"} className='flex items-center gap-3 hover:scale-102 transition-transform duration-200'>
                    <div className='size-10 rounded-xl bg-gradient-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-lg'>
                        <Sparkles className='size-6 text-white' />
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider'>
                            DevHub
                        </span>
                        <span className='text-xs text-base-content/60 -mt-1 font-medium'>Code Together</span>
                    </div>
                </Link>

                {/* Right Side */}

                <div className='flex items-center gap-1'>
                    <Link to={"/problems"} className={`px-4 py-2 rounded-lg transition-all duration-200 ${isActive('/problems') ? "bg-primary text-primary-content" : "hover: bg-base-200 text-base-content/80 hover:text-base-content"}`}>
                        <div className='flex items-center gap-x-2.5'>
                            <BookOpenIcon className="size-4 " />
                            <span className='font-medium hidden sm:inline'>Problems</span>
                        </div>
                    </Link>
                    <Link to={"/dashboard"} className={`px-4 py-2 rounded-lg transition-all duration-200 ${isActive('/dashboard') ? "bg-primary text-primary-content" : "hover: bg-base-200 text-base-content/80 hover:text-base-content"}`}>
                        <div className='flex items-center gap-x-2.5'>
                            <LayoutDashboardIcon className="size-4 " />
                            <span className='font-medium hidden sm:inline'>Dashboard</span>
                        </div>
                    </Link>
                    <div className='mt-1.5 ml-4'>
                        <UserButton />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar