import type { Station } from "../types/station";

export const initialStations: Station[] = [
  {
    id: "station-1",
    name: "Chattogram Station",
    code: "CTG-01",
    address: "Chattogram",
    phone: "01XXXXXXXXX",
    email: "chattogram@example.com",
    isActive: true,
  },
  {
    id: "station-2",
    name: "Dhaka Station",
    code: "DHK-01",
    address: "Dhaka",
    phone: "01XXXXXXXXX",
    email: "dhaka@example.com",
    isActive: true,
  },
  {
    id: "station-3",
    name: "Rajshahi Station",
    code: "RAJ-01",
    address: "Rajshahi",
    phone: "01XXXXXXXXX",
    email: "rajshahi@example.com",
    isActive: false,
  },
];