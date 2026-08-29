export type DutyType = "shift" | "general";

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  designation: string;
  phone: string;
  email: string;
  stationId: string;

  dutyType: DutyType;
  basicSalary: number;

  isActive: boolean;
}

export type CreateEmployeeInput = Omit<
  Employee,
  "id"
>;