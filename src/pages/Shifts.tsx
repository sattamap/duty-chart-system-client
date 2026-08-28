import { useState } from "react";

import type {
  CreateShiftInput,
  Shift,
} from "../types/shift";

import { initialShifts } from "../data/shifts";
import { initialStations } from "../data/stations";

import Modal from "../components/ui/Modal";
import ShiftForm from "../components/shifts/ShiftForm";

function Shifts() {
  const [shifts, setShifts] =
    useState<Shift[]>(initialShifts);

  const [search, setSearch] = useState("");

  const [selectedStationId, setSelectedStationId] =
    useState("all");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingShift, setEditingShift] =
    useState<Shift | null>(null);

  const getStationName = (
    stationId: string
  ) => {
    const station = initialStations.find(
      (station) => station.id === stationId
    );

    return station?.name ?? "Unknown Station";
  };

  const filteredShifts = shifts.filter(
    (shift) => {
      const searchTerm =
        search.toLowerCase();

      const matchesSearch =
        shift.name
          .toLowerCase()
          .includes(searchTerm) ||
        shift.shortName
          .toLowerCase()
          .includes(searchTerm);

      const matchesStation =
        selectedStationId === "all" ||
        shift.stationId ===
          selectedStationId;

      return (
        matchesSearch && matchesStation
      );
    }
  );

  // Add Shift

  const handleAddShift = (
    data: CreateShiftInput
  ) => {
    const newShift: Shift = {
      id: crypto.randomUUID(),
      ...data,
    };

    setShifts((currentShifts) => [
      ...currentShifts,
      newShift,
    ]);

    setIsModalOpen(false);
  };

  // Edit Shift

  const handleEditShift = (
    data: CreateShiftInput
  ) => {
    if (!editingShift) {
      return;
    }

    setShifts((currentShifts) =>
      currentShifts.map((shift) =>
        shift.id === editingShift.id
          ? {
              ...shift,
              ...data,
            }
          : shift
      )
    );

    setEditingShift(null);
    setIsModalOpen(false);
  };

  // Delete Shift

  const handleDeleteShift = (
    shift: Shift
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${shift.name}?`
    );

    if (!confirmed) {
      return;
    }

    setShifts((currentShifts) =>
      currentShifts.filter(
        (currentShift) =>
          currentShift.id !== shift.id
      )
    );
  };

  // Open Add Modal

  const handleOpenAddModal = () => {
    setEditingShift(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal

  const handleOpenEditModal = (
    shift: Shift
  ) => {
    setEditingShift(shift);
    setIsModalOpen(true);
  };

  // Close Modal

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingShift(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Shifts
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Configure customizable shifts for
            each station.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
        >
          + Add Shift
        </button>
      </div>

      {/* Filters */}

      <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Search shifts..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500"
        />

        <select
          value={selectedStationId}
          onChange={(event) =>
            setSelectedStationId(
              event.target.value
            )
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-500"
        >
          <option value="all">
            All Stations
          </option>

          {initialStations.map((station) => (
            <option
              key={station.id}
              value={station.id}
            >
              {station.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 font-medium text-slate-600">
                  Shift
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Station
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Time
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Status
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredShifts.map((shift) => (
                <tr
                  key={shift.id}
                  className="border-t border-slate-200"
                >
                  {/* Shift */}

                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-800">
                      {shift.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      Short name:{" "}
                      {shift.shortName}
                    </p>
                  </td>

                  {/* Station */}

                  <td className="px-5 py-4 text-slate-600">
                    {getStationName(
                      shift.stationId
                    )}
                  </td>

                  {/* Time */}

                  <td className="px-5 py-4 text-slate-600">
                    {shift.startTime} -{" "}
                    {shift.endTime}
                  </td>

                  {/* Status */}

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        shift.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {shift.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenEditModal(
                            shift
                          )
                        }
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteShift(
                            shift
                          )
                        }
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredShifts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    No shifts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shift Modal */}

      <Modal
        isOpen={isModalOpen}
        title={
          editingShift
            ? "Edit Shift"
            : "Add Shift"
        }
        onClose={handleCloseModal}
      >
        <ShiftForm
          initialData={
            editingShift ?? undefined
          }
          stations={initialStations}
          onSubmit={
            editingShift
              ? handleEditShift
              : handleAddShift
          }
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default Shifts;