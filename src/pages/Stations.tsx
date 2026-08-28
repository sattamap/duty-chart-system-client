import { useState } from "react";

import type {
  CreateStationInput,
  Station,
} from "../types/station";

import { initialStations } from "../data/stations";

import Modal from "../components/ui/Modal";
import StationForm from "../components/stations/StationForm";

function Stations() {
  const [stations, setStations] =
    useState<Station[]>(initialStations);

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingStation, setEditingStation] =
    useState<Station | null>(null);

  const [deletingStation, setDeletingStation] =
    useState<Station | null>(null);

  const filteredStations = stations.filter((station) =>
    station.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Add Station
  const handleAddStation = (
    data: CreateStationInput
  ) => {
    const newStation: Station = {
      id: crypto.randomUUID(),
      ...data,
    };

    setStations((currentStations) => [
      ...currentStations,
      newStation,
    ]);

    setIsModalOpen(false);
  };

  // Edit Station
  const handleEditStation = (
    data: CreateStationInput
  ) => {
    if (!editingStation) {
      return;
    }

    setStations((currentStations) =>
      currentStations.map((station) =>
        station.id === editingStation.id
          ? {
              ...station,
              ...data,
            }
          : station
      )
    );

    setEditingStation(null);
    setIsModalOpen(false);
  };

  // Delete Station
  const handleDeleteStation = () => {
    if (!deletingStation) {
      return;
    }

    setStations((currentStations) =>
      currentStations.filter(
        (station) =>
          station.id !== deletingStation.id
      )
    );

    setDeletingStation(null);
  };

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingStation(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (
    station: Station
  ) => {
    setEditingStation(station);
    setIsModalOpen(true);
  };

  // Close Add/Edit Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStation(null);
  };

  // Open Delete Confirmation
  const handleOpenDeleteModal = (
    station: Station
  ) => {
    setDeletingStation(station);
  };

  // Close Delete Confirmation
  const handleCloseDeleteModal = () => {
    setDeletingStation(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Stations
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage stations in your duty chart system.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
        >
          + Add Station
        </button>
      </div>

      {/* Search */}

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <input
          type="text"
          placeholder="Search stations..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500"
        />
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 font-medium text-slate-600">
                  Station
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Code
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Address
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
              {filteredStations.map((station) => (
                <tr
                  key={station.id}
                  className="border-t border-slate-200"
                >
                  {/* Station */}

                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-800">
                      {station.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {station.email}
                    </p>
                  </td>

                  {/* Code */}

                  <td className="px-5 py-4 text-slate-600">
                    {station.code}
                  </td>

                  {/* Address */}

                  <td className="px-5 py-4 text-slate-600">
                    {station.address}
                  </td>

                  {/* Status */}

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        station.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {station.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      {/* Edit */}

                      <button
                        type="button"
                        onClick={() =>
                          handleOpenEditModal(station)
                        }
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>

                      {/* Delete */}

                      <button
                        type="button"
                        onClick={() =>
                          handleOpenDeleteModal(station)
                        }
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty Search Result */}

              {filteredStations.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    No stations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Station Modal */}

      <Modal
        isOpen={isModalOpen}
        title={
          editingStation
            ? "Edit Station"
            : "Add Station"
        }
        onClose={handleCloseModal}
      >
        <StationForm
          initialData={
            editingStation ?? undefined
          }
          onSubmit={
            editingStation
              ? handleEditStation
              : handleAddStation
          }
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* Delete Confirmation Modal */}

      <Modal
        isOpen={deletingStation !== null}
        title="Delete Station"
        onClose={handleCloseDeleteModal}
      >
        <div className="space-y-5">
          {/* Warning */}

          <div>
            <p className="text-sm text-slate-600">
              Are you sure you want to delete this
              station?
            </p>

            {deletingStation && (
              <p className="mt-2 font-medium text-slate-800">
                {deletingStation.name}
              </p>
            )}

            <p className="mt-2 text-sm text-slate-500">
              This action cannot be undone.
            </p>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={handleCloseDeleteModal}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDeleteStation}
              className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
            >
              Delete Station
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Stations;