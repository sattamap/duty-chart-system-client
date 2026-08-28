import { useState } from "react";

import type {
  CreateEmployeeInput,
  Employee,
} from "../types/employee";

import { initialEmployees } from "../data/employees";
import { initialStations } from "../data/stations";

import Modal from "../components/ui/Modal";
import EmployeeForm from "../components/employees/EmployeeForm";

function Employees() {
  const [employees, setEmployees] =
    useState<Employee[]>(initialEmployees);

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingEmployee, setEditingEmployee] =
    useState<Employee | null>(null);

  const filteredEmployees = employees.filter(
    (employee) => {
      const searchTerm = search.toLowerCase();

      return (
        employee.name
          .toLowerCase()
          .includes(searchTerm) ||
        employee.employeeId
          .toLowerCase()
          .includes(searchTerm) ||
        employee.designation
          .toLowerCase()
          .includes(searchTerm)
      );
    }
  );

  const getStationName = (stationId: string) => {
    const station = initialStations.find(
      (station) => station.id === stationId
    );

    return station?.name ?? "Unassigned";
  };

  // Add Employee

  const handleAddEmployee = (
    data: CreateEmployeeInput
  ) => {
    const newEmployee: Employee = {
      id: crypto.randomUUID(),
      ...data,
    };

    setEmployees((currentEmployees) => [
      ...currentEmployees,
      newEmployee,
    ]);

    setIsModalOpen(false);
  };

  // Edit Employee

  const handleEditEmployee = (
    data: CreateEmployeeInput
  ) => {
    if (!editingEmployee) {
      return;
    }

    setEmployees((currentEmployees) =>
      currentEmployees.map((employee) =>
        employee.id === editingEmployee.id
          ? {
              ...employee,
              ...data,
            }
          : employee
      )
    );

    setEditingEmployee(null);
    setIsModalOpen(false);
  };

  // Open Add Modal

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal

  const handleOpenEditModal = (
    employee: Employee
  ) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  // Close Modal

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Employees
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage employees in your duty chart
            system.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddModal}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
        >
          + Add Employee
        </button>
      </div>

      {/* Search */}

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <input
          type="text"
          placeholder="Search by name, ID, or designation..."
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
                  Employee
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Employee ID
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Designation
                </th>

                <th className="px-5 py-3 font-medium text-slate-600">
                  Station
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
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-t border-slate-200"
                >
                  {/* Employee */}

                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-800">
                      {employee.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {employee.email}
                    </p>
                  </td>

                  {/* Employee ID */}

                  <td className="px-5 py-4 text-slate-600">
                    {employee.employeeId}
                  </td>

                  {/* Designation */}

                  <td className="px-5 py-4 text-slate-600">
                    {employee.designation}
                  </td>

                  {/* Station */}

                  <td className="px-5 py-4 text-slate-600">
                    {getStationName(
                      employee.stationId
                    )}
                  </td>

                  {/* Status */}

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        employee.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {employee.isActive
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
                          handleOpenEditModal(employee)
                        }
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEmployees.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-slate-500"
                  >
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Modal */}

      <Modal
        isOpen={isModalOpen}
        title={
          editingEmployee
            ? "Edit Employee"
            : "Add Employee"
        }
        onClose={handleCloseModal}
      >
        <EmployeeForm
          initialData={
            editingEmployee ?? undefined
          }
          stations={initialStations}
          onSubmit={
            editingEmployee
              ? handleEditEmployee
              : handleAddEmployee
          }
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}

export default Employees;