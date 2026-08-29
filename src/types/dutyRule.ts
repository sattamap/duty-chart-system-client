export interface DutyRule {
  id: string;

  name: string;

  weeklyTargetHours: number;

  workingDaysPerWeek: number;

  daysOffPerWeek: number;

  overtimeEnabled: boolean;

  maximumMonthlyOvertimeHours: number;

  overtimeLimitedByBasicSalary: boolean;

  dayOffDutyCountsAsOvertime: boolean;

  holidayDutyCountsAsOvertime: boolean;

  isActive: boolean;
}

export type CreateDutyRuleInput = Omit<
  DutyRule,
  "id"
>;