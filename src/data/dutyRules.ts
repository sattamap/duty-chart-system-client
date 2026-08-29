import type { DutyRule } from "../types/dutyRule";

export const initialDutyRules: DutyRule[] = [
  {
    id: "duty-rule-1",

    name: "5-Day Working Pattern",

    weeklyTargetHours: 40,

    workingDaysPerWeek: 5,

    daysOffPerWeek: 2,

    overtimeEnabled: true,

    maximumMonthlyOvertimeHours: 150,

    overtimeLimitedByBasicSalary: true,

    dayOffDutyCountsAsOvertime: true,

    holidayDutyCountsAsOvertime: true,

    isActive: true,
  },

  {
    id: "duty-rule-2",

    name: "6-Day Working Pattern",

    weeklyTargetHours: 40,

    workingDaysPerWeek: 6,

    daysOffPerWeek: 1,

    overtimeEnabled: true,

    maximumMonthlyOvertimeHours: 150,

    overtimeLimitedByBasicSalary: true,

    dayOffDutyCountsAsOvertime: true,

    holidayDutyCountsAsOvertime: true,

    isActive: true,
  },
];