'use client';

import React from 'react';
import { getUserReservations, getReservationDetails } from '@/lib/data';
import AuthProtect from '@/components/AuthProtect';
import ReservationCard from '@/components/ReservationCard';
import { CalendarClock } from 'lucide-react';

export default function ReservationsPage() {
  const reservations = getUserReservations();
  const reservationDetails = getReservationDetails(reservations);

  return (
    <AuthProtect>
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col">
            <h1 className="fw-bold mb-2">Your Reservations</h1>
            <p className="text-muted">
              Manage your current and upcoming car rentals
            </p>
          </div>
        </div>
        
        {reservationDetails.length > 0 ? (
          <>
            <div className="mb-4">
              <div className="nav nav-tabs">
                <button
                  className="nav-link active"
                  type="button"
                >
                  All Reservations ({reservationDetails.length})
                </button>
                <button
                  className="nav-link"
                  type="button"
                >
                  Upcoming
                </button>
                <button
                  className="nav-link"
                  type="button"
                >
                  Past
                </button>
              </div>
            </div>
            
            <div className="row">
              <div className="col-lg-8">
                {reservationDetails.map((reservation: any) => (
                  <ReservationCard
                    key={reservation.id}
                    id={reservation.id}
                    carId={reservation.carId}
                    carName={reservation.carName}
                    carImage={reservation.carImage}
                    startDate={reservation.startDate}
                    endDate={reservation.endDate}
                    totalPrice={reservation.totalPrice}
                    status={reservation.status}
                  />
                ))}
              </div>
              
              <div className="col-lg-4 d-none d-lg-block">
                <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
                  <div className="card-body p-4">
                    <h5 className="card-title mb-3">Reservation Summary</h5>
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span>Total Reservations</span>
                        <span className="fw-bold">{reservationDetails.length}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Active Reservations</span>
                        <span className="fw-bold">
                          {reservationDetails.filter(r => r.status === 'confirmed').length}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Pending Reservations</span>
                        <span className="fw-bold">
                          {reservationDetails.filter(r => r.status === 'pending').length}
                        </span>
                      </div>
                    </div>
                    
                    <hr />
                    
                    <div className="alert alert-info d-flex align-items-start p-3" role="alert">
                      <CalendarClock className="me-2 mt-1 flex-shrink-0" size={18} />
                      <div>
                        <p className="mb-1 fw-bold">Need to modify a reservation?</p>
                        <p className="mb-0 small">
                          Contact our customer service at least 24 hours before your pick-up time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <div className="mb-3">
              <div className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                <CalendarClock size={40} className="text-secondary" />
              </div>
            </div>
            <h3 className="mb-3">No reservations yet</h3>
            <p className="text-muted mb-4">
              You don't have any car reservations. Browse our collection and book your first ride.
            </p>
            <a href="/cars" className="btn btn-primary px-4 py-2">
              Browse Cars
            </a>
          </div>
        )}
      </div>
    </AuthProtect>
  );
}