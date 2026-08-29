import type { Employee } from "../types/employee";

export const initialEmployees: Employee[] = [
  {
    id: "employee-1",
    employeeId: "EMP-001",
    name: "Rahim Ahmed",
    designation: "Officer",
    phone: "01711111111",
    email: "rahim@example.com",
    stationId: "station-1",

    dutyType: "shift",
    basicSalary: 12480,

    isActive: true,
  },

  {
    id: "employee-2",
    employeeId: "EMP-002",
    name: "Karim Hasan",
    designation: "Assistant",
    phone: "01722222222",
    email: "karim@example.com",
    stationId: "station-1",

    dutyType: "shift",
    basicSalary: 15000,

    isActive: true,
  },

  {
    id: "employee-3",
    employeeId: "EMP-003",
    name: "Sohel Mia",
    designation: "Supervisor",
    phone: "01733333333",
    email: "sohel@example.com",
    stationId: "station-2",

    dutyType: "general",
    basicSalary: 22000,

    isActive: true,
  },

  {
    id: "employee-4",
    employeeId: "EMP-004",
    name: "Nusrat Jahan",
    designation: "Officer",
    phone: "01744444444",
    email: "nusrat@example.com",
    stationId: "station-2",

    dutyType: "shift",
    basicSalary: 18000,

    isActive: true,
  },

  {
    id: "employee-5",
    employeeId: "EMP-005",
    name: "Tanvir Hossain",
    designation: "Assistant",
    phone: "01755555555",
    email: "tanvir@example.com",
    stationId: "station-3",

    dutyType: "general",
    basicSalary: 16000,

    isActive: false,
  },
];