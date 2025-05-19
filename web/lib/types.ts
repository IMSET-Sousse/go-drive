export interface CarCategory {
    id: number;
    name: string;
    description: string;
    slug: string;
}

export interface Location {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
}

export interface CarImage {
    id: number;
    image: string;
    is_primary: boolean;
}

export interface Review {
    id: number;
    user: string;
    rating: number;
    comment: string;
    created_at: string;
}

export interface Car {
    id: number;
    category: CarCategory;
    name: string;
    slug: string;
    description: string;
    daily_rate: number;
    image: string;
    year: number;
    make: string;
    model: string;
    seats: number;
    doors: number;
    transmission: 'automatic' | 'manual';
    fuel_type: 'petrol' | 'diesel' | 'electric' | 'hybrid';
    mileage: number;
    features: string;
    features_list: string[];
    is_available: boolean;
    is_featured: boolean;
    locations: Location[];
    images: CarImage[];
    reviews: Review[];
    created_at: string;
    updated_at: string;
} 