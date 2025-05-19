import React from 'react';
import Link from 'next/link';
import { Users, Shield, Clock, Award, Car as CarIcon, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="py-5 text-center text-white position-relative"
        style={{
          background: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.pexels.com/photos/3807150/pexels-photo-3807150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1") center/cover no-repeat',
          minHeight: '400px'
        }}
      >
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-3">About GODRIVE</h1>
              <p className="lead mb-4">
                We're on a mission to provide exceptional car rental experiences with premium vehicles and outstanding service.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img 
                src="https://images.pexels.com/photos/6894430/pexels-photo-6894430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Team at GODRIVE" 
                className="img-fluid rounded shadow-sm"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold mb-3">Our Story</h2>
              <p className="mb-3">
                Founded in 2025, GODRIVE began with a simple idea: to make premium car rentals accessible, affordable, and enjoyable. What started as a small fleet of three luxury cars has grown into a diverse collection of vehicles to suit every need and preference.
              </p>
              <p className="mb-3">
                Our founder, Anis EL KHAL, noticed a gap in the market for high-quality rentals without the excessive fees and restrictions. This vision has guided our growth and commitment to excellence over the years.
              </p>
              <p className="mb-4">
                Today, we serve thousands of happy customers across the country, maintaining our dedication to personalized service and exceptional value. Our team's passion for cars and customer satisfaction remains at the heart of everything we do.
              </p>
              <Link href="/cars" className="btn btn-primary">
                Explore Our Fleet
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Values Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Core Values</h2>
            <p className="text-muted">The principles that guide everything we do</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <Award size={28} className="text-primary" />
                  </div>
                  <h5 className="card-title">Excellence</h5>
                  <p className="card-text text-muted">
                    We maintain the highest standards in our fleet and services, constantly striving to exceed expectations.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <Shield size={28} className="text-primary" />
                  </div>
                  <h5 className="card-title">Reliability</h5>
                  <p className="card-text text-muted">
                    Our customers can depend on us for well-maintained vehicles and consistent, trustworthy service.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <Users size={28} className="text-primary" />
                  </div>
                  <h5 className="card-title">Customer Focus</h5>
                  <p className="card-text text-muted">
                    We prioritize our customers' needs, offering personalized experiences and attentive service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Meet Our Team</h2>
            <p className="text-muted">The people who make SpeedRent exceptional</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  className="card-img-top" 
                  alt="James Patterson"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body p-4">
                  <h5 className="card-title mb-1">Anis EL khaL</h5>
                  <p className="text-muted mb-3">Founder & CEO</p>
                  <p className="card-text">
                    Car enthusiast and entrepreneur with a vision to transform the rental experience.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  className="card-img-top" 
                  alt="Amal"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body p-4">
                  <h5 className="card-title mb-1">Amal </h5>
                  <p className="text-muted mb-3">Operations Director</p>
                  <p className="card-text">
                    Ensures smooth day-to-day operations and exceptional customer experiences.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm text-center">
                <img 
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  className="card-img-top" 
                  alt="Michael Rodriguez"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body p-4">
                  <h5 className="card-title mb-1">Michael Rodriguez</h5>
                  <p className="text-muted mb-3">Fleet Manager</p>
                  <p className="card-text">
                    Automobile expert who curates and maintains our premium vehicle collection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Locations Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Locations</h2>
            <p className="text-muted">Conveniently located to serve you better</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <MapPin size={24} className="text-primary me-2" />
                    <h5 className="card-title mb-0">Downtown</h5>
                  </div>
                  <p className="card-text mb-3">
                    123 Main Street<br />
                    Car City, CC 10001<br />
                    (555) 123-4567
                  </p>
                  <p className="text-muted small mb-0">
                    <strong>Hours:</strong><br />
                    Monday-Friday: 8AM-8PM<br />
                    Saturday: 9AM-6PM<br />
                    Sunday: 10AM-4PM
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <MapPin size={24} className="text-primary me-2" />
                    <h5 className="card-title mb-0">Airport</h5>
                  </div>
                  <p className="card-text mb-3">
                    Terminal 2, Rental Area B<br />
                    International Airport<br />
                    (555) 987-6543
                  </p>
                  <p className="text-muted small mb-0">
                    <strong>Hours:</strong><br />
                    Monday-Sunday: 6AM-11PM<br />
                    24/7 Drop-off Available
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <MapPin size={24} className="text-primary me-2" />
                    <h5 className="card-title mb-0">West Side</h5>
                  </div>
                  <p className="card-text mb-3">
                    456 Ocean Drive<br />
                    Beach Town, BT 20002<br />
                    (555) 765-4321
                  </p>
                  <p className="text-muted small mb-0">
                    <strong>Hours:</strong><br />
                    Monday-Friday: 9AM-7PM<br />
                    Saturday: 10AM-5PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <h2 className="fw-bold">Ready to experience premium car rentals?</h2>
              <p className="lead mb-0">
                Explore our fleet and book your perfect vehicle today.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link href="/cars" className="btn btn-light btn-lg">
                Browse Our Cars
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}