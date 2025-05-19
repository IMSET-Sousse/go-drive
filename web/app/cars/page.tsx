'use client';

import React, { useState, useEffect } from 'react';
import { carService, Car } from '@/lib/services/carService';
import CarCard from '@/components/CarCard';
import { Search, Filter, ChevronDown } from 'lucide-react';

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const data = await carService.getAllCars();
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

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="fw-bold">Our Fleet</h1>
          <p className="text-muted">Choose from our wide selection of vehicles</p>
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
        {filteredCars.map(car => (
          <div key={car.id} className="col">
            <CarCard car={car} />
          </div>
        ))}
      </div>

      {filteredCars.length === 0 && (
        <div className="text-center py-5">
          <p className="mb-0">No cars found in this category.</p>
        </div>
      )}
    </div>
  );
}