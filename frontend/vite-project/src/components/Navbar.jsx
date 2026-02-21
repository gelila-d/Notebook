import React from 'react';
import { Link } from 'react-router';
import { PlusIcon, LogOutIcon, UserIcon } from 'lucide-react';

const Navbar = ({ username, onLogout }) => {
  return (
    <header className='bg-base-300 border-b border-base-content/10 sticky top-0 z-50'>
      <div className='mx-auto max-w-6xl px-4 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo / Brand */}
          <Link to="/">
            <h1 className='text-3xl font-bold text-primary font-mono tracking-tight hover:opacity-80 transition-opacity'>
              ThinkBoard
            </h1>
          </Link>

          <div className='flex items-center gap-3 sm:gap-6'>
            {/* User Profile Info (Visible if username exists) */}
            {username && (
              <div className="hidden md:flex items-center gap-2 text-base-content/70">
                <UserIcon className="size-4" />
                <span className="font-medium">{username}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className='flex items-center gap-2'>
              <Link to={"/create"} className='btn btn-secondary btn-sm md:btn-md'>
                <PlusIcon className='size-5' />
                <span className="hidden xs:inline">New Note</span>
              </Link>

              {/* Logout Button */}
              <button 
                onClick={onLogout} 
                className='btn btn-ghost btn-sm md:btn-md text-error hover:bg-error/10'
                title="Logout"
              >
                <LogOutIcon className='size-5' />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;