'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AuthProtect from '@/components/AuthProtect';
import { User, Mail, Phone, MapPin, Key, AlertTriangle } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('profile');
  
  const handleLogout = () => {
    logout();
    router.push('/');
  };
  
  return (
    <AuthProtect>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3 mb-4 mb-lg-0">
            <div className="card shadow-sm mb-4">
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto" style={{ width: '80px', height: '80px' }}>
                    <span className="fs-4">{user?.name.charAt(0)}</span>
                  </div>
                </div>
                <h5 className="card-title mb-1">{user?.name}</h5>
                <p className="text-muted mb-3">{user?.email}</p>
                <button
                  className="btn btn-outline-danger w-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
            
            <div className="list-group shadow-sm">
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={16} className="me-2" />
                Profile Information
              </button>
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <Key size={16} className="me-2" />
                Security Settings
              </button>
              <button 
                className={`list-group-item list-group-item-action ${activeTab === 'preferences' ? 'active' : ''}`}
                onClick={() => setActiveTab('preferences')}
              >
                <User size={16} className="me-2" />
                Preferences
              </button>
            </div>
          </div>
          
          <div className="col-lg-9">
            {activeTab === 'profile' && (
              <div className="card shadow-sm">
                <div className="card-header bg-white py-3">
                  <h5 className="card-title mb-0">Profile Information</h5>
                </div>
                <div className="card-body p-4">
                  <div className="alert alert-info mb-4 d-flex align-items-center" role="alert">
                    <User size={18} className="me-2" />
                    <div>
                      This is a demo profile. Changes will not be saved.
                    </div>
                  </div>
                  
                  <form>
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label">Full Name</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <User size={16} />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="fullName"
                          defaultValue={user?.name}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Mail size={16} />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          defaultValue={user?.email}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Phone size={16} />
                        </span>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">Address</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <MapPin size={16} />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="Enter your address"
                        />
                      </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div className="card shadow-sm">
                <div className="card-header bg-white py-3">
                  <h5 className="card-title mb-0">Security Settings</h5>
                </div>
                <div className="card-body p-4">
                  <div className="alert alert-info mb-4 d-flex align-items-center" role="alert">
                    <Key size={18} className="me-2" />
                    <div>
                      This is a demo page. Password changes will not be saved.
                    </div>
                  </div>
                  
                  <form>
                    <div className="mb-3">
                      <label htmlFor="currentPassword" className="form-label">Current Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="currentPassword"
                        placeholder="Enter your current password"
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        placeholder="Enter a new password"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Confirm your new password"
                      />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">
                      Update Password
                    </button>
                  </form>
                  
                  <hr className="my-4" />
                  
                  <div className="mb-3">
                    <h6 className="fw-bold">Two-Factor Authentication</h6>
                    <p className="text-muted">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <button className="btn btn-outline-primary">
                      Enable Two-Factor Authentication
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'preferences' && (
              <div className="card shadow-sm">
                <div className="card-header bg-white py-3">
                  <h5 className="card-title mb-0">Preferences</h5>
                </div>
                <div className="card-body p-4">
                  <div className="alert alert-info mb-4 d-flex align-items-center" role="alert">
                    <AlertTriangle size={18} className="me-2" />
                    <div>
                      This is a demo page. Preference changes will not be saved.
                    </div>
                  </div>
                  
                  <form>
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Email Notifications</h6>
                      
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" id="emailNewDeals" defaultChecked />
                        <label className="form-check-label" htmlFor="emailNewDeals">
                          New deals and promotions
                        </label>
                      </div>
                      
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" id="emailReservationReminders" defaultChecked />
                        <label className="form-check-label" htmlFor="emailReservationReminders">
                          Reservation reminders
                        </label>
                      </div>
                      
                      <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" id="emailNewFeatures" />
                        <label className="form-check-label" htmlFor="emailNewFeatures">
                          New features and updates
                        </label>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h6 className="fw-bold mb-3">Car Preferences</h6>
                      
                      <div className="mb-3">
                        <label htmlFor="preferredCarType" className="form-label">Preferred Car Type</label>
                        <select className="form-select" id="preferredCarType">
                          <option value="">No preference</option>
                          <option value="Luxury">Luxury</option>
                          <option value="SUV">SUV</option>
                          <option value="Economy">Economy</option>
                          <option value="Sports">Sports</option>
                          <option value="Electric">Electric</option>
                        </select>
                      </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">
                      Save Preferences
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthProtect>
  );
}