import { useState } from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import type {
  CreateLeaveTypeInput,
  LeaveType,
} from "../../types/leave";

interface LeaveTypeFormProps {
  initialData?: LeaveType;
  onSubmit: (data: CreateLeaveTypeInput) => void;
  onCancel: () => void;
}

function LeaveTypeForm({
  initialData,
  onSubmit,
  onCancel,
}: LeaveTypeFormProps) {
  const [formData, setFormData] =
    useState<CreateLeaveTypeInput>({
      name: initialData?.name ?? "",
      code: initialData?.code ?? "",
      annualQuota:
        initialData?.annualQuota,
      isPaid:
        initialData?.isPaid ?? true,
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
        name === "annualQuota"
          ? value === ""
            ? undefined
            : Number(value)
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
      {/* Leave Name */}

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Leave Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Casual Leave"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {/* Leave Code */}

      <div>
        <label
          htmlFor="code"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Leave Code
        </label>

        <input
          id="code"
          name="code"
          type="text"
          value={formData.code}
          onChange={handleChange}
          placeholder="e.g. CL"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm uppercase outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {/* Annual Quota */}

      <div>
        <label
          htmlFor="annualQuota"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Annual Quota
        </label>

        <input
          id="annualQuota"
          name="annualQuota"
          type="number"
          min="0"
          step="1"
          value={
            formData.annualQuota ?? ""
          }
          onChange={handleChange}
          placeholder="e.g. 20"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />

        <p className="mt-1.5 text-xs text-slate-500">
          Leave blank if this leave type does
          not use a simple annual quota.
        </p>
      </div>

      {/* Paid Status */}

      <div>
        <label
          htmlFor="isPaid"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Paid Status
        </label>

        <select
          id="isPaid"
          value={
            formData.isPaid
              ? "paid"
              : "unpaid"
          }
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              isPaid:
                event.target.value === "paid",
            }))
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        >
          <option value="paid">
            Paid
          </option>

          <option value="unpaid">
            Unpaid
          </option>
        </select>
      </div>

      {/* Active Status */}

      <div>
        <label
          htmlFor="isActive"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Status
        </label>

        <select
          id="isActive"
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
            : "Add Leave Type"}
        </button>
      </div>
    </form>
  );
}

export default LeaveTypeForm;