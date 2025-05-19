import React from 'react';
import Link from 'next/link';
import { Car } from '@/lib/data';
import { Check, AlertCircle } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="card h-100 shadow-sm hover-lift">
      <div className="position-relative">
        <img 
          src={car.image} 
          className="card-img-top" 
          alt={`${car.make} ${car.model}`}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 end-0 p-2">
          {car.availability ? (
            <span className="badge bg-success d-flex align-items-center">
              <Check size={14} className="me-1" /> Available
            </span>
          ) : (
            <span className="badge bg-danger d-flex align-items-center">
              <AlertCircle size={14} className="me-1" /> Unavailable
            </span>
          )}
        </div>
        <div className="position-absolute bottom-0 start-0 p-2">
          <span className="badge bg-dark">{car.category}</span>
        </div>
      </div>
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{car.make} {car.model}</h5>
        <p className="card-text text-muted mb-1">{car.year} • {car.name}</p>
        
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-bold text-primary">${car.price}</span>
          <span className="text-muted small">per day</span>
        </div>
        
        <p className="card-text small mb-3">{car.description.substring(0, 80)}...</p>
        
        <div className="mt-auto">
          <Link 
            href={`/cars/${car.id}`} 
            className="btn btn-primary w-100"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;