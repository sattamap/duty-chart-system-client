export interface Station {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  isActive: boolean;
}

export interface CreateStationInput {
  name: string;
  code: string;
  address: string;
  phone: string;
  email: string;
  isActive: boolean;
}