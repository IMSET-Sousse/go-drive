import api from '../api';
import { Car, CarCategory, Location } from '../types';

export const carService = {
    // Get all cars with optional filtering
    getCars: async (params?: { category?: string }) => {
        const response = await api.get<Car[]>('/api/cars/', { params });
        return response.data;
    },

    // Get a single car by slug
    getCar: async (slug: string) => {
        const response = await api.get<Car>(`/api/cars/${slug}/`);
        return response.data;
    },

    // Get all car categories
    getCategories: async () => {
        const response = await api.get<CarCategory[]>('/api/categories/');
        return response.data;
    },

    // Get all locations
    getLocations: async () => {
        const response = await api.get<Location[]>('/api/locations/');
        return response.data;
    },

    // Create a new car (admin only)
    createCar: async (carData: Partial<Car>) => {
        const response = await api.post<Car>('/api/cars/', carData);
        return response.data;
    },

    // Update a car (admin only)
    updateCar: async (slug: string, carData: Partial<Car>) => {
        const response = await api.patch<Car>(`/api/cars/${slug}/`, carData);
        return response.data;
    },

    // Delete a car (admin only)
    deleteCar: async (slug: string) => {
        await api.delete(`/api/cars/${slug}/`);
    },

    // Add a review to a car
    addReview: async (slug: string, reviewData: { rating: number; comment: string }) => {
        const response = await api.post(`/api/cars/${slug}/reviews/`, reviewData);
        return response.data;
    }
}; 