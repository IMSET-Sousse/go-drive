'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { carService, Car } from '@/lib/services/carService';
import { Calendar, MapPin, Users, Check } from 'lucide-react';

export default function CarDetail() {
  const params = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      if (!params?.id) {
        setError('Invalid car ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const carId = parseInt(params.id as string);
        const data = await carService.getCarById(carId);
        setCar(data);
        setError(null);
      } catch (err) {
        setError('Failed to load car details. Please try again later.');
        console.error('Error loading car:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error || 'Car not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="position-relative" style={{ height: '400px' }}>
            <Image
              src={car.image}
              alt={`${car.make} ${car.model}`}
              fill
              className="rounded-3 object-fit-cover"
            />
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h1 className="h2 mb-3">{car.make} {car.model}</h1>
              
              <div className="d-flex gap-3 mb-4">
                <div className="d-flex align-items-center">
                  <Calendar className="text-muted me-2" size={20} />
                  <span>{car.year}</span>
                </div>
                <div className="d-flex align-items-center">
                  <MapPin className="text-muted me-2" size={20} />
                  <span>{car.category}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Users className="text-muted me-2" size={20} />
                  <span>5 seats</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="h4 mb-3">Features</h3>
                <div className="d-flex flex-wrap gap-2">
                  {car.features.map((feature, index) => (
                    <span key={index} className="badge bg-light text-dark">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="h4 mb-3">Description</h3>
                <p className="text-muted">{car.description}</p>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <span className="h3 mb-0">${car.price}</span>
                  <span className="text-muted">/day</span>
                </div>
                <span className={`badge ${car.availability ? 'bg-success' : 'bg-danger'}`}>
                  {car.availability ? 'Available' : 'Unavailable'}
                </span>
              </div>

              <button 
                className="btn btn-primary w-100"
                disabled={!car.availability}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}