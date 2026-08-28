export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  designation: string;
  phone: string;
  email: string;
  stationId: string;
  isActive: boolean;
}

export type CreateEmployeeInput = Omit<
  Employee,
  "id"
>;