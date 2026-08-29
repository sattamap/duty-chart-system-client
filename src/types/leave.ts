export interface LeaveType {
  id: string;
  name: string;
  code: string;
  annualQuota?: number;
  isPaid: boolean;
  isActive: boolean;
}

export type CreateLeaveTypeInput = Omit<
  LeaveType,
  "id"
>;