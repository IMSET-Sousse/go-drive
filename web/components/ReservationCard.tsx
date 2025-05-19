'use client';

import React from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { Calendar, DollarSign } from 'lucide-react';

interface ReservationCardProps {
  id: number;
  carId: number;
  carName: string;
  carImage: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'confirmed':
      return <span className="badge bg-success">Confirmed</span>;
    case 'pending':
      return <span className="badge bg-warning text-dark">Pending</span>;
    case 'cancelled':
      return <span className="badge bg-danger">Cancelled</span>;
    default:
      return <span className="badge bg-secondary">Unknown</span>;
  }
};

const ReservationCard: React.FC<ReservationCardProps> = ({
  id,
  carId,
  carName,
  carImage,
  startDate,
  endDate,
  totalPrice,
  status
}) => {
  return (
    <div className="card mb-4 shadow-sm">
      <div className="row g-0">
        <div className="col-md-4">
          <img 
            src={carImage} 
            className="img-fluid rounded-start" 
            alt={carName}
            style={{ height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="card-title">{carName}</h5>
              {getStatusBadge(status)}
            </div>
            
            <p className="card-text mb-3">
              <span className="text-muted">Reservation #{id}</span>
            </p>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-2">
                  <Calendar size={18} className="text-primary me-2" />
                  <div>
                    <small className="text-muted d-block">Pick-up Date</small>
                    <strong>{format(new Date(startDate), 'MMM dd, yyyy')}</strong>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-2">
                  <Calendar size={18} className="text-primary me-2" />
                  <div>
                    <small className="text-muted d-block">Return Date</small>
                    <strong>{format(new Date(endDate), 'MMM dd, yyyy')}</strong>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="d-flex align-items-center mb-3">
              <DollarSign size={18} className="text-success me-2" />
              <div>
                <small className="text-muted d-block">Total Price</small>
                <strong className="text-success">${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            
            <div className="d-flex justify-content-between mt-3">
              <Link href={`/cars/${carId}`} className="btn btn-outline-secondary">
                View Car
              </Link>
              <button className="btn btn-outline-danger" disabled={status === 'cancelled'}>
                {status === 'cancelled' ? 'Cancelled' : 'Cancel Reservation'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;