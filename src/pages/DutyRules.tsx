import { useState } from "react";

import type {
  CreateDutyRuleInput,
  DutyRule,
} from "../types/dutyRule";

import { initialDutyRules } from "../data/dutyRules";

import Modal from "../components/ui/Modal";
import DutyRuleForm from "../components/duty-rules/DutyRuleForm";

function DutyRules() {
  const [dutyRules, setDutyRules] =
    useState<DutyRule[]>(initialDutyRules);

  const [search, setSearch] =
    useState("");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingDutyRule, setEditingDutyRule] =
    useState<DutyRule | null>(null);

  const filteredDutyRules =
    dutyRules.filter((rule) =>
      rule.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  // Add

  const handleAddDutyRule = (
    data: CreateDutyRuleInput
  ) => {
    const newDutyRule: DutyRule = {
      id: crypto.randomUUID(),
      ...data,
    };

    setDutyRules((current) => [
      ...current,
      newDutyRule,
    ]);

    setIsModalOpen(false);
  };

  // Edit

  const handleEditDutyRule = (
    data: CreateDutyRuleInput
  ) => {
    if (!editingDutyRule) {
      return;
    }

    setDutyRules((current) =>
      current.map((rule) =>
        rule.id === editingDutyRule.id
          ? {
              ...rule,
              ...data,
            }
          : rule
      )
    );

    setEditingDutyRule(null);
    setIsModalOpen(false);
  };

  // Delete

  const handleDeleteDutyRule = (
    rule: DutyRule
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${rule.name}"?`
    );

    if (!confirmed) {
      return;
    }

    setDutyRules((current) =>
      current.filter(
        (currentRule) =>
          currentRule.id !== rule.id
      )
    );
  };

  // Add Modal

  const handleOpenAddModal = () => {
    setEditingDutyRule(null);
    setIsModalOpen(true);
  };

  // Edit Modal

  const handleOpenEditModal = (
    rule: DutyRule
  ) => {
    setEditingDutyRule(rule);
    setIsModalOpen(true);
  };

  // Close Modal

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDutyRule(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Duty Rules
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Configure working-hour and overtime rules.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
        >
          + Add Duty Rule
        </button>
      </div>

      {/* Search */}

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <input
          type="text"
          placeholder="Search duty rules..."
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
                  Rule
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Weekly Hours
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Working Days
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Days Off
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Max OT
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
              {filteredDutyRules.map((rule) => (
                <tr
                  key={rule.id}
                  className="border-t border-slate-200"
                >
                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-800">
                      {rule.name}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {rule.weeklyTargetHours} hrs
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {rule.workingDaysPerWeek}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {rule.daysOffPerWeek}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {rule.maximumMonthlyOvertimeHours} hrs
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        rule.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {rule.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenEditModal(rule)
                        }
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteDutyRule(rule)
                        }
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredDutyRules.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    No duty rules found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}

      <Modal
        isOpen={isModalOpen}
        title={
          editingDutyRule
            ? "Edit Duty Rule"
            : "Add Duty Rule"
        }
        onClose={handleCloseModal}
      >
        <DutyRuleForm
          initialData={
            editingDutyRule ?? undefined
          }
          onSubmit={
            editingDutyRule
              ? handleEditDutyRule
              : handleAddDutyRule
          }
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default DutyRules;