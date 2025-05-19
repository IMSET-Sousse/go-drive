import React from 'react';
import Link from 'next/link';
import { Car, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="mb-4">
            <Car size={80} className="text-primary" />
          </div>
          
          <h1 className="display-4 fw-bold mb-3">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          
          <p className="lead mb-5">
            Oops! The page you're looking for seems to have taken a detour.
            Let's get you back on the road.
          </p>
          
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link href="/" className="btn btn-primary d-flex align-items-center justify-content-center gap-2">
              <Home size={18} />
              Return Home
            </Link>
            <Link href="/cars" className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2">
              <Search size={18} />
              Browse Cars
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}