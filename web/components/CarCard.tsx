import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/lib/services/carService';
import { Calendar, MapPin, Users } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="position-relative" style={{ height: '200px' }}>
        <Image
          src={car.image}
          alt={`${car.make} ${car.model}`}
          fill
          className="card-img-top object-fit-cover"
        />
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{car.make} {car.model}</h5>
          <span className="badge bg-primary">${car.price}/day</span>
        </div>
        <p className="card-text text-muted small mb-3">{car.description}</p>
        
        <div className="d-flex gap-3 mb-3">
          <div className="d-flex align-items-center">
            <Calendar className="text-muted me-2" size={16} />
            <span className="small text-muted">{car.year}</span>
          </div>
          <div className="d-flex align-items-center">
            <MapPin className="text-muted me-2" size={16} />
            <span className="small text-muted">{car.category}</span>
          </div>
          <div className="d-flex align-items-center">
            <Users className="text-muted me-2" size={16} />
            <span className="small text-muted">5 seats</span>
          </div>
        </div>

        <div className="d-flex flex-wrap gap-2 mb-3">
          {car.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="badge bg-light text-dark">
              {feature}
            </span>
          ))}
        </div>

        <Link 
          href={`/cars/${car.id}`}
          className="btn btn-primary w-100"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;