import { useState } from "react";
import type {
  ChangeEvent,
  FormEvent,
} from "react";

import type {
  CreateStationInput,
  Station,
} from "../../types/station";

interface StationFormProps {
  initialData?: Station;
  onSubmit: (data: CreateStationInput) => void;
  onCancel: () => void;
}

function StationForm({
  initialData,
  onSubmit,
  onCancel,
}: StationFormProps) {
  const [formData, setFormData] =
    useState<CreateStationInput>({
      name: initialData?.name ?? "",
      code: initialData?.code ?? "",
      address: initialData?.address ?? "",
      phone: initialData?.phone ?? "",
      email: initialData?.email ?? "",
      isActive: initialData?.isActive ?? true,
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
      {/* Station Name */}

      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Station Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Chattogram Station"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {/* Station Code */}

      <div>
        <label
          htmlFor="code"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Station Code
        </label>

        <input
          id="code"
          name="code"
          type="text"
          value={formData.code}
          onChange={handleChange}
          placeholder="e.g. CTG-01"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm uppercase outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
      </div>

      {/* Address */}

      <div>
        <label
          htmlFor="address"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Address
        </label>

        <input
          id="address"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder="e.g. Chattogram"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        />
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
          placeholder="e.g. station@example.com"
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
          value={formData.isActive ? "active" : "inactive"}
          onChange={(event) =>
            setFormData((current) => ({
              ...current,
              isActive:
                event.target.value === "active",
            }))
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
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
          {isEditing ? "Save Changes" : "Add Station"}
        </button>
      </div>
    </form>
  );
}

export default StationForm;