'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cars } from '@/lib/data';
import CarCard from './CarCard';

const FeaturedCars = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const categories = Array.from(new Set(cars.map(car => car.category)));
  
  const filteredCars = activeCategory
    ? cars.filter(car => car.category === activeCategory)
    : cars;
    
  const featuredCars = filteredCars.slice(0, 3);
  
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