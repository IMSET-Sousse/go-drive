'use client';

import React, { useState, useEffect } from 'react';
import { cars } from '@/lib/data';
import CarCard from '@/components/CarCard';
import { Search, Filter, ChevronDown } from 'lucide-react';

export default function CarsPage() {
  const [filteredCars, setFilteredCars] = useState(cars);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  
  // Extract all unique categories
  const categories = ['All', ...Array.from(new Set(cars.map(car => car.category)))];
  
  useEffect(() => {
    // Filter cars based on search term and category
    let result = [...cars];
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        car => 
          car.name.toLowerCase().includes(search) || 
          car.make.toLowerCase().includes(search) || 
          car.model.toLowerCase().includes(search)
      );
    }
    
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(car => car.category === selectedCategory);
    }
    
    // Sort cars
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'year-new':
        result.sort((a, b) => b.year - a.year);
        break;
      default:
        // Default sorting (newest first)
        result.sort((a, b) => b.year - a.year);
    }
    
    setFilteredCars(result);
  }, [searchTerm, selectedCategory, sortBy]);
  
  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="fw-bold mb-2">Available Cars</h1>
          <p className="text-muted">
            Browse our selection of {cars.length} premium vehicles for your next adventure
          </p>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <Search size={18} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by car name, make or model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-md-end">
              <button 
                className="btn btn-outline-secondary d-md-none w-100"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} className="me-2" />
                Filters
                <ChevronDown size={16} className="ms-2" />
              </button>
              
              <div className="d-none d-md-flex gap-2">
                <select 
                  className="form-select" 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                
                <select 
                  className="form-select" 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Sort By: Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="year-new">Year: Newest First</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Mobile filters */}
          {showFilters && (
            <div className="row mt-3 d-md-none">
              <div className="col-6">
                <select 
                  className="form-select" 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <select 
                  className="form-select" 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Sort By: Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="year-new">Year: Newest First</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Results count */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="mb-0">
          Showing <span className="fw-bold">{filteredCars.length}</span> cars
        </p>
      </div>
      
      {/* Cars grid */}
      {filteredCars.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredCars.map(car => (
            <div key={car.id} className="col">
              <CarCard car={car} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p className="mb-2 fw-bold fs-5">No cars found</p>
          <p className="text-muted">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}