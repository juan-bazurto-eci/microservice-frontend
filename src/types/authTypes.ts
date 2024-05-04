export interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  birthDate: string;
  shippingAddress: {
    name: string;
    phoneNumber: string;
    address: string;
    postalCode: string;
    city: string;
  };
  paymentMethod: {};
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isUserLoggedIn: () => boolean;
  getUserData: () => User | null;
}
