import Hero from '@/components/Hero';
import FeaturedCars from '@/components/FeaturedCars';
import Link from 'next/link';
import { Car, Shield, Clock, CreditCard } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <Hero />
      
      <FeaturedCars />
      
      {/* Why Choose Us Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose SpeedRent?</h2>
            <p className="text-muted">Experience the premium difference with our service</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <Car size={28} className="text-primary" />
                  </div>
                  <h5 className="card-title">Premium Vehicles</h5>
                  <p className="card-text text-muted">
                    Choose from our carefully maintained fleet of luxury and economy vehicles
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <Shield size={28} className="text-primary" />
                  </div>
                  <h5 className="card-title">Fully Insured</h5>
                  <p className="card-text text-muted">
                    Drive with peace of mind knowing you're covered with our comprehensive insurance
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <Clock size={28} className="text-primary" />
                  </div>
                  <h5 className="card-title">24/7 Support</h5>
                  <p className="card-text text-muted">
                    Our team is always available to assist you with any questions or concerns
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-3">
              <div className="card h-100 border-0 shadow-sm text-center p-4">
                <div className="card-body">
                  <div className="rounded-circle bg-primary bg-opacity-10 p-3 d-inline-flex mb-3">
                    <CreditCard size={28} className="text-primary" />
                  </div>
                  <h5 className="card-title">Easy Payment</h5>
                  <p className="card-text text-muted">
                    Flexible payment options and transparent pricing with no hidden fees
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
              <h2 className="fw-bold">Ready for your next adventure?</h2>
              <p className="lead mb-0">
                Browse our selection of premium vehicles and book your perfect ride today.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link href="/cars" className="btn btn-light btn-lg">
                Find Your Car
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">What Our Customers Say</h2>
            <p className="text-muted">Read testimonials from our satisfied clients</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="mb-3">
                    <span className="text-warning">★★★★★</span>
                  </div>
                  <p className="card-text mb-3">
                    "The BMW 5 Series I rented was immaculate and performed flawlessly. The booking process was simple, and the staff was extremely professional."
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      <span>JD</span>
                    </div>
                    <div>
                      <h6 className="mb-0">John Doe</h6>
                      <small className="text-muted">Business Traveler</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="mb-3">
                    <span className="text-warning">★★★★★</span>
                  </div>
                  <p className="card-text mb-3">
                    "SpeedRent made our family vacation perfect by providing a spacious SUV that fit all our luggage. The children loved it, and the price was reasonable."
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      <span>JS</span>
                    </div>
                    <div>
                      <h6 className="mb-0">Jane Smith</h6>
                      <small className="text-muted">Family Traveler</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="mb-3">
                    <span className="text-warning">★★★★★</span>
                  </div>
                  <p className="card-text mb-3">
                    "I rented a Tesla Model 3 and was impressed by the condition of the vehicle. The customer service was top-notch and I'll definitely use SpeedRent again."
                  </p>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                      <span>MJ</span>
                    </div>
                    <div>
                      <h6 className="mb-0">Michael Johnson</h6>
                      <small className="text-muted">Tech Enthusiast</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}