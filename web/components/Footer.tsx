import React from 'react';
import Link from 'next/link';
import { Car, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <Car className="me-2" size={24} />
              <h5 className="mb-0 fw-bold">SpeedRent</h5>
            </div>
            <p className="text-muted">
              Premium car rental service offering a wide selection of vehicles for all your needs.
              Experience luxury, comfort, and reliability on the road.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-md-2 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/" className="text-muted text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link href="/cars" className="text-muted text-decoration-none">Cars</Link>
              </li>
              <li className="mb-2">
                <Link href="/about" className="text-muted text-decoration-none">About</Link>
              </li>
              <li className="mb-2">
                <Link href="/login" className="text-muted text-decoration-none">Login</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-4">
            <h5 className="mb-3">Car Categories</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link href="/cars?category=Luxury" className="text-muted text-decoration-none">Luxury</Link>
              </li>
              <li className="mb-2">
                <Link href="/cars?category=SUV" className="text-muted text-decoration-none">SUV</Link>
              </li>
              <li className="mb-2">
                <Link href="/cars?category=Economy" className="text-muted text-decoration-none">Economy</Link>
              </li>
              <li className="mb-2">
                <Link href="/cars?category=Sports" className="text-muted text-decoration-none">Sports</Link>
              </li>
              <li className="mb-2">
                <Link href="/cars?category=Electric" className="text-muted text-decoration-none">Electric</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-4">
            <h5 className="mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <Phone size={16} className="me-2 text-muted" />
                <span className="text-muted">+1 (555) 123-4567</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <Mail size={16} className="me-2 text-muted" />
                <span className="text-muted">info@speedrent.com</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <MapPin size={16} className="me-2 text-muted" />
                <span className="text-muted">123 Drive Avenue, Car City, CC 12345</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-4 bg-secondary" />
        
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="mb-0 text-muted">
              &copy; {new Date().getFullYear()} SpeedRent. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <a href="#" className="text-muted text-decoration-none">Privacy Policy</a>
              </li>
              <li className="list-inline-item ms-3">
                <a href="#" className="text-muted text-decoration-none">Terms of Service</a>
              </li>
              <li className="list-inline-item ms-3">
                <a href="#" className="text-muted text-decoration-none">FAQ</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;