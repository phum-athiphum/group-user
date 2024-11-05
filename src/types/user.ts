export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: 'male' | 'female';
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: string;
}

export interface DepartmentSummary {
  male: number;
  female: number;
  ageRange: string;
  hair: HairSummary;
  addressUser: AddressUserSummary;
}

// พวก interface ย่อย ใน user

interface Hair {
  color: string;
  type: string;
}

interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface Company {
  department: string;
  name: string;
  title: string;
  address: CompanyAddress;
}

interface CompanyAddress {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

// พวก interface ย่อย ใน userSummary

interface HairSummary {
  [color: string]: number;
}

interface AddressUserSummary {
  [fullName: string]: string;
}
