export interface Car {
  id: number;
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  description: string;
  category: string;
  features: string[];
  availability: boolean;
}

export interface Reservation {
  id: number;
  carId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface User {
  id: number;
  name: string;
  email: string;
  reservations: number[];
}

// Sample car data
export const cars: Car[] = [
  {
    id: 1,
    name: 'Luxury Sedan',
    make: 'BMW',
    model: '5 Series',
    year: 2023,
    price: 89,
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Experience luxury driving with our BMW 5 Series. This elegant sedan combines performance and comfort for an unforgettable ride.',
    category: 'Luxury',
    features: ['Leather seats', 'GPS Navigation', 'Bluetooth', 'Heated seats', 'Backup camera'],
    availability: true
  },
  {
    id: 2,
    name: 'Economy Hatchback',
    make: 'Toyota',
    model: 'Yaris',
    year: 2022,
    price: 45,
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Efficient and reliable, our Toyota Yaris is perfect for city driving and longer trips alike. Great fuel economy and easy handling.',
    category: 'Economy',
    features: ['Bluetooth', 'USB ports', 'Fuel efficient', 'Compact design', 'Air conditioning'],
    availability: true
  },
  {
    id: 3,
    name: 'Spacious SUV',
    make: 'Audi',
    model: 'Q7',
    year: 2023,
    price: 120,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Perfect for family trips, our Audi Q7 offers spacious comfort and the latest technology for a premium driving experience.',
    category: 'SUV',
    features: ['7 seats', 'Panoramic sunroof', 'Premium sound system', 'All-wheel drive', 'Driver assistance package'],
    availability: true
  },
  {
    id: 4,
    name: 'Sport Convertible',
    make: 'Porsche',
    model: '911 Carrera',
    year: 2023,
    price: 250,
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Feel the thrill of driving our Porsche 911 Carrera. This iconic sports car delivers exhilarating performance and distinctive styling.',
    category: 'Sports',
    features: ['Convertible top', 'Sport mode', 'Leather interior', 'Premium sound system', 'Launch control'],
    availability: true
  },
  {
    id: 5,
    name: 'Electric Sedan',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 110,
    image: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Go green with our Tesla Model 3. Cutting-edge electric performance with zero emissions and impressive range.',
    category: 'Electric',
    features: ['Autopilot', 'Electric', 'Large touchscreen', 'Long range battery', 'Premium interior'],
    availability: true
  },
  {
    id: 6,
    name: 'Compact Crossover',
    make: 'Honda',
    model: 'CR-V',
    year: 2022,
    price: 75,
    image: 'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'The reliable Honda CR-V offers the perfect balance of comfort, space, and efficiency for any adventure.',
    category: 'SUV',
    features: ['Spacious trunk', 'Safety sensors', 'Fuel efficient', 'Apple CarPlay', 'Android Auto'],
    availability: true
  }
];

// Sample reservations data
export const reservations: Reservation[] = [
  {
    id: 101,
    carId: 1,
    startDate: '2025-05-15',
    endDate: '2025-05-20',
    totalPrice: 445,
    status: 'confirmed'
  },
  {
    id: 102,
    carId: 3,
    startDate: '2025-06-10',
    endDate: '2025-06-15',
    totalPrice: 600,
    status: 'pending'
  }
];

// Current user data for authentication simulation
export const currentUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  reservations: [101, 102]
};

export const getUserReservations = (): Reservation[] => {
  return reservations.filter(reservation => 
    currentUser.reservations.includes(reservation.id)
  );
};

export const getReservationDetails = (reservations: Reservation[]) => {
  return reservations.map(reservation => {
    const car = cars.find(car => car.id === reservation.carId);
    return {
      ...reservation,
      carName: car ? `${car.make} ${car.model}` : 'Unknown',
      carImage: car ? car.image : ''
    };
  });
};