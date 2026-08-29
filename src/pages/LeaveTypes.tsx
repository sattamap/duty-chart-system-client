import { useState } from "react";

import type {
  CreateLeaveTypeInput,
  LeaveType,
} from "../types/leave";

import { initialLeaveTypes } from "../data/leaveTypes";

import Modal from "../components/ui/Modal";
import LeaveTypeForm from "../components/leaves/LeaveTypeForm";

function LeaveTypes() {
  const [leaveTypes, setLeaveTypes] =
    useState<LeaveType[]>(
      initialLeaveTypes
    );

  const [search, setSearch] =
    useState("");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingLeaveType, setEditingLeaveType] =
    useState<LeaveType | null>(null);

  const filteredLeaveTypes =
    leaveTypes.filter((leaveType) => {
      const searchTerm =
        search.toLowerCase();

      return (
        leaveType.name
          .toLowerCase()
          .includes(searchTerm) ||
        leaveType.code
          .toLowerCase()
          .includes(searchTerm)
      );
    });

  // Add Leave Type

  const handleAddLeaveType = (
    data: CreateLeaveTypeInput
  ) => {
    const newLeaveType: LeaveType = {
      id: crypto.randomUUID(),
      ...data,
    };

    setLeaveTypes((current) => [
      ...current,
      newLeaveType,
    ]);

    setIsModalOpen(false);
  };

  // Edit Leave Type

  const handleEditLeaveType = (
    data: CreateLeaveTypeInput
  ) => {
    if (!editingLeaveType) {
      return;
    }

    setLeaveTypes((current) =>
      current.map((leaveType) =>
        leaveType.id ===
        editingLeaveType.id
          ? {
              ...leaveType,
              ...data,
            }
          : leaveType
      )
    );

    setEditingLeaveType(null);
    setIsModalOpen(false);
  };

  // Delete Leave Type

  const handleDeleteLeaveType = (
    leaveType: LeaveType
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${leaveType.name}?`
    );

    if (!confirmed) {
      return;
    }

    setLeaveTypes((current) =>
      current.filter(
        (currentLeaveType) =>
          currentLeaveType.id !==
          leaveType.id
      )
    );
  };

  // Open Add Modal

  const handleOpenAddModal = () => {
    setEditingLeaveType(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal

  const handleOpenEditModal = (
    leaveType: LeaveType
  ) => {
    setEditingLeaveType(leaveType);
    setIsModalOpen(true);
  };

  // Close Modal

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLeaveType(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Leave Types
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Configure leave types used by the
            duty chart system.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
        >
          + Add Leave Type
        </button>
      </div>

      {/* Search */}

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <input
          type="text"
          placeholder="Search leave types..."
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
                  Leave Type
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Code
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Annual Quota
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Paid
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
              {filteredLeaveTypes.map(
                (leaveType) => (
                  <tr
                    key={leaveType.id}
                    className="border-t border-slate-200"
                  >
                    {/* Leave Type */}

                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-800">
                        {leaveType.name}
                      </p>
                    </td>

                    {/* Code */}

                    <td className="px-5 py-4 text-slate-600">
                      {leaveType.code}
                    </td>

                    {/* Quota */}

                    <td className="px-5 py-4 text-slate-600">
                      {leaveType.annualQuota ??
                        "Configurable"}
                    </td>

                    {/* Paid */}

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          leaveType.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {leaveType.isPaid
                          ? "Paid"
                          : "Unpaid"}
                      </span>
                    </td>

                    {/* Status */}

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          leaveType.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {leaveType.isActive
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
                              leaveType
                            )
                          }
                          className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteLeaveType(
                              leaveType
                            )
                          }
                          className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}

              {/* Empty Result */}

              {filteredLeaveTypes.length ===
                0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    No leave types found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Type Modal */}

      <Modal
        isOpen={isModalOpen}
        title={
          editingLeaveType
            ? "Edit Leave Type"
            : "Add Leave Type"
        }
        onClose={handleCloseModal}
      >
        <LeaveTypeForm
          initialData={
            editingLeaveType ?? undefined
          }
          onSubmit={
            editingLeaveType
              ? handleEditLeaveType
              : handleAddLeaveType
          }
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default LeaveTypes;