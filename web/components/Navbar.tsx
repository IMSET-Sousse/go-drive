'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Car } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Car className="me-2" size={24} />
          <span className="fw-bold">GoDrive</span>
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                href="/" 
                className={`nav-link ${pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                href="/cars" 
                className={`nav-link ${pathname === '/cars' || pathname.startsWith('/cars/') ? 'active' : ''}`}
              >
                Cars
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link 
                  href="/reservations" 
                  className={`nav-link ${pathname === '/reservations' ? 'active' : ''}`}
                >
                  Reservations
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link 
                href="/about" 
                className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
              >
                About
              </Link>
            </li>
          </ul>
          
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <Link 
                    href="/profile" 
                    className={`nav-link ${pathname === '/profile' ? 'active' : ''}`}
                  >
                    <span className="d-none d-lg-inline me-2">Welcome,</span>
                    {user.name}
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    onClick={logout} 
                    className="nav-link border-0 bg-transparent"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link 
                    href="/login" 
                    className={`nav-link ${pathname === '/login' ? 'active' : ''}`}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    href="/register" 
                    className={`nav-link ${pathname === '/register' ? 'active' : ''}`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;