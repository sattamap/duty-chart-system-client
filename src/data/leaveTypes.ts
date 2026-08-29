import type { LeaveType } from "../types/leave";

export const initialLeaveTypes: LeaveType[] = [
  {
    id: "leave-type-1",
    name: "Casual Leave",
    code: "CL",
    annualQuota: 20,
    isPaid: true,
    isActive: true,
  },

  {
    id: "leave-type-2",
    name: "Earned Leave",
    code: "EL",
    annualQuota: undefined,
    isPaid: true,
    isActive: true,
  },

  {
    id: "leave-type-3",
    name: "Maternity Leave",
    code: "ML",
    annualQuota: undefined,
    isPaid: true,
    isActive: true,
  },

  {
    id: "leave-type-4",
    name: "Extraordinary Leave",
    code: "EOL",
    annualQuota: undefined,
    isPaid: false,
    isActive: true,
  },
];