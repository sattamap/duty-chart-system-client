import { useState } from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import type {
  CreateDutyRuleInput,
  DutyRule,
} from "../../types/dutyRule";

interface DutyRuleFormProps {
  initialData?: DutyRule;
  onSubmit: (data: CreateDutyRuleInput) => void;
  onCancel: () => void;
}

function DutyRuleForm({
  initialData,
  onSubmit,
  onCancel,
}: DutyRuleFormProps) {
  const [formData, setFormData] =
    useState<CreateDutyRuleInput>({
      name: initialData?.name ?? "",

      weeklyTargetHours:
        initialData?.weeklyTargetHours ?? 40,

      workingDaysPerWeek:
        initialData?.workingDaysPerWeek ?? 5,

      daysOffPerWeek:
        initialData?.daysOffPerWeek ?? 2,

      overtimeEnabled:
        initialData?.overtimeEnabled ?? true,

      maximumMonthlyOvertimeHours:
        initialData?.maximumMonthlyOvertimeHours ??
        150,

      overtimeLimitedByBasicSalary:
        initialData?.overtimeLimitedByBasicSalary ??
        true,

      dayOffDutyCountsAsOvertime:
        initialData?.dayOffDutyCountsAsOvertime ??
        true,

      holidayDutyCountsAsOvertime:
        initialData?.holidayDutyCountsAsOvertime ??
        true,

      isActive:
        initialData?.isActive ?? true,
    });

  const handleNumberChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: Number(value),
    }));
  };

  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleBooleanChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value === "true",
    }));
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    onSubmit(formData);
  };

  const isEditing = Boolean(initialData);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Rule Name */}

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Rule Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleTextChange}
          placeholder="e.g. 5-Day Working Pattern"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {/* Weekly Target Hours */}

      <div>
        <label
          htmlFor="weeklyTargetHours"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Weekly Target Hours
        </label>

        <input
          id="weeklyTargetHours"
          name="weeklyTargetHours"
          type="number"
          min="0"
          step="0.5"
          value={formData.weeklyTargetHours}
          onChange={handleNumberChange}
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />

        <p className="mt-1.5 text-xs text-slate-500">
          Example: 40 hours per week.
        </p>
      </div>

      {/* Working Days */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="workingDaysPerWeek"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Working Days Per Week
          </label>

          <input
            id="workingDaysPerWeek"
            name="workingDaysPerWeek"
            type="number"
            min="1"
            max="7"
            value={formData.workingDaysPerWeek}
            onChange={handleNumberChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          />
        </div>

        <div>
          <label
            htmlFor="daysOffPerWeek"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Days Off Per Week
          </label>

          <input
            id="daysOffPerWeek"
            name="daysOffPerWeek"
            type="number"
            min="0"
            max="7"
            value={formData.daysOffPerWeek}
            onChange={handleNumberChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          />
        </div>
      </div>

      {/* Overtime */}

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-base font-semibold text-slate-800">
          Overtime Rules
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure the overtime limits and conditions.
        </p>

        <div className="mt-5 space-y-5">
          {/* OT Enabled */}

          <div>
            <label
              htmlFor="overtimeEnabled"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Overtime
            </label>

            <select
              id="overtimeEnabled"
              name="overtimeEnabled"
              value={
                formData.overtimeEnabled
                  ? "true"
                  : "false"
              }
              onChange={handleBooleanChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            >
              <option value="true">
                Enabled
              </option>

              <option value="false">
                Disabled
              </option>
            </select>
          </div>

          {/* Maximum Monthly OT */}

          <div>
            <label
              htmlFor="maximumMonthlyOvertimeHours"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Maximum Monthly OT Hours
            </label>

            <input
              id="maximumMonthlyOvertimeHours"
              name="maximumMonthlyOvertimeHours"
              type="number"
              min="0"
              step="1"
              value={
                formData.maximumMonthlyOvertimeHours
              }
              onChange={handleNumberChange}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            />

            <p className="mt-1.5 text-xs text-slate-500">
              Current configured limit: 150 hours.
            </p>
          </div>

          {/* Salary Restriction */}

          <div>
            <label
              htmlFor="overtimeLimitedByBasicSalary"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Limit OT By Basic Salary
            </label>

            <select
              id="overtimeLimitedByBasicSalary"
              name="overtimeLimitedByBasicSalary"
              value={
                formData.overtimeLimitedByBasicSalary
                  ? "true"
                  : "false"
              }
              onChange={handleBooleanChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            >
              <option value="true">
                Yes
              </option>

              <option value="false">
                No
              </option>
            </select>
          </div>

          {/* Day Off OT */}

          <div>
            <label
              htmlFor="dayOffDutyCountsAsOvertime"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Duty on Employee Day-Off Counts as OT
            </label>

            <select
              id="dayOffDutyCountsAsOvertime"
              name="dayOffDutyCountsAsOvertime"
              value={
                formData.dayOffDutyCountsAsOvertime
                  ? "true"
                  : "false"
              }
              onChange={handleBooleanChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            >
              <option value="true">
                Yes
              </option>

              <option value="false">
                No
              </option>
            </select>
          </div>

          {/* Holiday OT */}

          <div>
            <label
              htmlFor="holidayDutyCountsAsOvertime"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Duty on Government Holiday Counts as OT
            </label>

            <select
              id="holidayDutyCountsAsOvertime"
              name="holidayDutyCountsAsOvertime"
              value={
                formData.holidayDutyCountsAsOvertime
                  ? "true"
                  : "false"
              }
              onChange={handleBooleanChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
            >
              <option value="true">
                Yes
              </option>

              <option value="false">
                No
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Status */}

      <div>
        <label
          htmlFor="isActive"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Status
        </label>

        <select
          id="isActive"
          name="isActive"
          value={
            formData.isActive
              ? "true"
              : "false"
          }
          onChange={handleBooleanChange}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        >
          <option value="true">
            Active
          </option>

          <option value="false">
            Inactive
          </option>
        </select>
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
        >
          {isEditing
            ? "Save Changes"
            : "Add Duty Rule"}
        </button>
      </div>
    </form>
  );
}

export default DutyRuleForm;