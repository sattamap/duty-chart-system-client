import { useState } from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import type {
  CreateShiftInput,
  Shift,
} from "../../types/shift";

import type { Station } from "../../types/station";

interface ShiftFormProps {
  initialData?: Shift;
  stations: Station[];
  onSubmit: (data: CreateShiftInput) => void;
  onCancel: () => void;
}

function ShiftForm({
  initialData,
  stations,
  onSubmit,
  onCancel,
}: ShiftFormProps) {
  const [formData, setFormData] =
    useState<CreateShiftInput>({
      stationId:
        initialData?.stationId ??
        stations[0]?.id ??
        "",
      name: initialData?.name ?? "",
      shortName:
        initialData?.shortName ?? "",
      startTime:
        initialData?.startTime ?? "",
      endTime:
        initialData?.endTime ?? "",
      isActive:
        initialData?.isActive ?? true,
    });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
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
              stationId: event.target.value,
            }))
          }
          required
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        >
          <option value="">
            Select a station
          </option>

          {stations
            .filter((station) => station.isActive)
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

      {/* Shift Name */}

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Shift Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Morning Shift"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {/* Short Name */}

      <div>
        <label
          htmlFor="shortName"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Short Name
        </label>

        <input
          id="shortName"
          name="shortName"
          type="text"
          value={formData.shortName}
          onChange={handleChange}
          placeholder="e.g. M"
          maxLength={5}
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm uppercase outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {/* Time */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="startTime"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Start Time
          </label>

          <input
            id="startTime"
            name="startTime"
            type="time"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          />
        </div>

        <div>
          <label
            htmlFor="endTime"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            End Time
          </label>

          <input
            id="endTime"
            name="endTime"
            type="time"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
          />
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
              ? "active"
              : "inactive"
          }
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              isActive:
                event.target.value === "active",
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
            : "Add Shift"}
        </button>
      </div>
    </form>
  );
}

export default ShiftForm;