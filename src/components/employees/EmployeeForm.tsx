import { useState } from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import type {
  CreateEmployeeInput,
  Employee,
} from "../../types/employee";

import type { Station } from "../../types/station";

interface EmployeeFormProps {
  initialData?: Employee;
  stations: Station[];
  onSubmit: (data: CreateEmployeeInput) => void;
  onCancel: () => void;
}

function EmployeeForm({
  initialData,
  stations,
  onSubmit,
  onCancel,
}: EmployeeFormProps) {
  const [formData, setFormData] =
    useState<CreateEmployeeInput>({
      employeeId:
        initialData?.employeeId ?? "",

      name:
        initialData?.name ?? "",

      designation:
        initialData?.designation ?? "",

      phone:
        initialData?.phone ?? "",

      email:
        initialData?.email ?? "",

      stationId:
        initialData?.stationId ??
        stations[0]?.id ??
        "",

      dutyType:
        initialData?.dutyType ?? "shift",

      basicSalary:
        initialData?.basicSalary ?? 0,

      isActive:
        initialData?.isActive ?? true,
    });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,

      [name]:
        name === "basicSalary"
          ? Number(value)
          : value,
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
      className="space-y-5"
    >
      {/* Employee ID */}

      <div>
        <label
          htmlFor="employeeId"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Employee ID
        </label>

        <input
          id="employeeId"
          name="employeeId"
          type="text"
          value={formData.employeeId}
          onChange={handleChange}
          placeholder="e.g. EMP-001"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm uppercase outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {/* Employee Name */}

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Employee Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Rahim Ahmed"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {/* Designation */}

      <div>
        <label
          htmlFor="designation"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Designation
        </label>

        <input
          id="designation"
          name="designation"
          type="text"
          value={formData.designation}
          onChange={handleChange}
          placeholder="e.g. Officer"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {/* Station */}

      <div>
        <label
          htmlFor="stationId"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Station
        </label>

        <select
          id="stationId"
          name="stationId"
          value={formData.stationId}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              stationId:
                event.target.value,
            }))
          }
          required
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        >
          <option value="">
            Select a station
          </option>

          {stations
            .filter(
              (station) => station.isActive
            )
            .map((station) => (
              <option
                key={station.id}
                value={station.id}
              >
                {station.name} ({station.code})
              </option>
            ))}
        </select>
      </div>

      {/* Duty Type */}

      <div>
        <label
          htmlFor="dutyType"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Duty Type
        </label>

        <select
          id="dutyType"
          name="dutyType"
          value={formData.dutyType}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              dutyType:
                event.target.value ===
                "general"
                  ? "general"
                  : "shift",
            }))
          }
          required
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        >
          <option value="shift">
            Shift Duty
          </option>

          <option value="general">
            General Duty
          </option>
        </select>

        <p className="mt-1.5 text-xs text-slate-500">
          Shift Duty allows variable shifts and
          day-offs. General Duty normally follows
          the fixed Friday/Saturday day-off rule.
        </p>
      </div>

      {/* Basic Salary */}

      <div>
        <label
          htmlFor="basicSalary"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Basic Salary
        </label>

        <div className="relative">
          <input
            id="basicSalary"
            name="basicSalary"
            type="number"
            min="0"
            step="0.01"
            value={
              formData.basicSalary || ""
            }
            onChange={handleChange}
            placeholder="e.g. 12480"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 pr-16 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          />

          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
            BDT
          </span>
        </div>

        <p className="mt-1.5 text-xs text-slate-500">
          Used later for calculating the
          employee's monthly overtime limit.
        </p>
      </div>

      {/* Phone */}

      <div>
        <label
          htmlFor="phone"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Phone
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="e.g. 017XXXXXXXX"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {/* Email */}

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="e.g. employee@example.com"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
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
              ? "active"
              : "inactive"
          }
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              isActive:
                event.target.value ===
                "active",
            }))
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        >
          <option value="active">
            Active
          </option>

          <option value="inactive">
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
            : "Add Employee"}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;