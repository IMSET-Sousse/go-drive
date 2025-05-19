'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { format, addDays, differenceInDays } from 'date-fns';
import { cars } from '@/lib/data';
import { useAuth } from '@/context/AuthContext';
import { 
  Calendar, DollarSign, Users, Gauge, Check, 
  ShieldCheck, Car as CarIcon, ArrowLeft 
} from 'lucide-react';

export default function CarDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const carId = Number(params.id);
  
  const car = cars.find(c => c.id === carId);
  
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(addDays(new Date(), 3), 'yyyy-MM-dd'));
  
  const calculateTotalPrice = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.max(1, differenceInDays(end, start));
    return days * (car?.price || 0);
  };
  
  const handleReservation = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    alert('Reservation created successfully! This is a demo so no actual reservation is made.');
    router.push('/reservations');
  };
  
  if (!car) {
    return (
      <div className="container py-5 text-center">
        <h2>Car not found</h2>
        <p className="mb-4">The car you're looking for doesn't exist or has been removed.</p>
        <button 
          className="btn btn-primary"
          onClick={() => router.push('/cars')}
        >
          Browse Other Cars
        </button>
      </div>
    );
  }
  
  return (
    <div className="container py-5">
      <button 
        className="btn btn-outline-secondary mb-4 d-flex align-items-center"
        onClick={() => router.push('/cars')}
      >
        <ArrowLeft size={16} className="me-2" />
        Back to Cars
      </button>
      
      <div className="row">
        <div className="col-lg-8 mb-4 mb-lg-0">
          <div className="card shadow-sm">
            <div className="position-relative">
              <img 
                src={car.image} 
                className="card-img-top" 
                alt={`${car.make} ${car.model}`}
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <div className="position-absolute top-0 end-0 p-3">
                <span className="badge bg-dark">{car.category}</span>
              </div>
            </div>
            
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1 className="card-title mb-1">{car.make} {car.model}</h1>
                  <p className="text-muted mb-0">{car.year} • {car.name}</p>
                </div>
                <div className="text-end">
                  <div className="fs-3 fw-bold text-primary">${car.price}</div>
                  <div className="text-muted">per day</div>
                </div>
              </div>
              
              <hr />
              
              <div className="row mb-4">
                <div className="col-sm-3 col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <CarIcon size={20} className="text-primary me-2" />
                    <span>{car.make}</span>
                  </div>
                </div>
                <div className="col-sm-3 col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <Calendar size={20} className="text-primary me-2" />
                    <span>{car.year}</span>
                  </div>
                </div>
                <div className="col-sm-3 col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <DollarSign size={20} className="text-primary me-2" />
                    <span>${car.price}/day</span>
                  </div>
                </div>
                <div className="col-sm-3 col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <ShieldCheck size={20} className="text-primary me-2" />
                    <span>Insured</span>
                  </div>
                </div>
              </div>
              
              <h5 className="mb-3">Description</h5>
              <p>{car.description}</p>
              
              <h5 className="mb-3">Features</h5>
              <div className="row mb-4">
                {car.features.map((feature, index) => (
                  <div key={index} className="col-md-6 mb-2">
                    <div className="d-flex align-items-center">
                      <Check size={18} className="text-success me-2" />
                      <span>{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Additional Images Section (placeholder) */}
          <div className="mt-4">
            <h5 className="mb-3">Gallery</h5>
            <div className="row g-2">
              <div className="col-4">
                <img 
                  src={car.image} 
                  className="img-fluid rounded" 
                  alt="Car view 1"
                  style={{ height: '120px', objectFit: 'cover', width: '100%' }}
                />
              </div>
              <div className="col-4">
                <img 
                  src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  className="img-fluid rounded" 
                  alt="Car view 2"
                  style={{ height: '120px', objectFit: 'cover', width: '100%' }}
                />
              </div>
              <div className="col-4">
                <img 
                  src="https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  className="img-fluid rounded" 
                  alt="Car view 3"
                  style={{ height: '120px', objectFit: 'cover', width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Book this car</h5>
            </div>
            <div className="card-body p-4">
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">Pick-up Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={format(new Date(), 'yyyy-MM-dd')}
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="endDate" className="form-label">Return Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                />
              </div>
              
              <div className="alert alert-light p-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Daily Rate:</span>
                  <span>${car.price}/day</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Duration:</span>
                  <span>
                    {Math.max(1, differenceInDays(new Date(endDate), new Date(startDate)))} days
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>${calculateTotalPrice()}</span>
                </div>
              </div>
              
              <button 
                className="btn btn-primary w-100 py-2 mb-3"
                onClick={handleReservation}
                disabled={!car.availability}
              >
                {car.availability ? 'Book Now' : 'Unavailable'}
              </button>
              
              <div className="small text-muted text-center">
                <p className="mb-0">Free cancellation up to 24 hours before pick-up</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}