import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div 
      className="py-5 text-center text-white position-relative overflow-hidden"
      style={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url("https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1") center/cover no-repeat',
        minHeight: '500px'
      }}
    >
      <div className="container d-flex flex-column justify-content-center" style={{ minHeight: '500px' }}>
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <h1 className="display-4 fw-bold mb-3 animate__animated animate__fadeIn">
              Drive Your Dreams
            </h1>
            <p className="lead mb-4 animate__animated animate__fadeIn animate__delay-1s">
              Experience the thrill of driving premium vehicles for your next adventure.
              From luxury sedans to rugged SUVs, we have the perfect car waiting for you.
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center animate__animated animate__fadeIn animate__delay-2s">
              <Link href="/cars" className="btn btn-primary btn-lg px-4 me-sm-3">
                Browse Cars
              </Link>
              <Link href="/about" className="btn btn-outline-light btn-lg px-4">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="position-absolute bottom-0 start-0 w-100 pb-4">
        <div className="container">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="bg-dark bg-opacity-75 rounded p-3 text-start">
                <h5 className="fw-bold mb-2">Wide Selection</h5>
                <p className="small mb-0">Choose from our extensive fleet of premium vehicles</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-dark bg-opacity-75 rounded p-3 text-start">
                <h5 className="fw-bold mb-2">Easy Booking</h5>
                <p className="small mb-0">Book online in minutes with our simple process</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-dark bg-opacity-75 rounded p-3 text-start">
                <h5 className="fw-bold mb-2">24/7 Support</h5>
                <p className="small mb-0">Our dedicated team is always ready to assist you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;