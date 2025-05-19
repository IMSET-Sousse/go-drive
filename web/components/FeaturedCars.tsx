'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { carService, Car } from '@/lib/services/carService';
import CarCard from './CarCard';

const FeaturedCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await carService.getFeaturedCars();
        setCars(data);
        setError(null);
      } catch (err) {
        setError('Failed to load cars. Please try again later.');
        console.error('Error loading cars:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);
  
  const categories = Array.from(new Set(cars.map(car => car.category)));
  
  const filteredCars = activeCategory
    ? cars.filter(car => car.category === activeCategory)
    : cars;
    
  const featuredCars = filteredCars.slice(0, 3);
  
  if (loading) {
    return (
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-5 bg-light">
        <div className="container">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-8">
            <h2 className="fw-bold">Featured Cars</h2>
            <p className="text-muted">Discover our most popular vehicles ready for your next adventure</p>
          </div>
          <div className="col-md-4 text-md-end">
            <Link href="/cars" className="btn btn-outline-primary">
              View All Cars
            </Link>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="d-flex flex-wrap gap-2">
            <button
              className={`btn ${activeCategory === null ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveCategory(null)}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {featuredCars.map(car => (
            <div key={car.id} className="col">
              <CarCard car={car} />
            </div>
          ))}
        </div>
        
        {featuredCars.length === 0 && (
          <div className="text-center py-5">
            <p className="mb-0">No cars found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;