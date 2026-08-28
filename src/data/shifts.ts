import type { Shift } from "../types/shift";

export const initialShifts: Shift[] = [
  {
    id: "shift-1",
    stationId: "station-1",
    name: "Morning Shift",
    shortName: "M",
    startTime: "06:00",
    endTime: "14:00",
    isActive: true,
  },

  {
    id: "shift-2",
    stationId: "station-1",
    name: "Evening Shift",
    shortName: "E",
    startTime: "14:00",
    endTime: "22:00",
    isActive: true,
  },

  {
    id: "shift-3",
    stationId: "station-1",
    name: "Night Shift",
    shortName: "N",
    startTime: "22:00",
    endTime: "06:00",
    isActive: true,
  },

  {
    id: "shift-4",
    stationId: "station-2",
    name: "Morning Shift",
    shortName: "M",
    startTime: "07:00",
    endTime: "15:00",
    isActive: true,
  },

  {
    id: "shift-5",
    stationId: "station-2",
    name: "Night Shift",
    shortName: "N",
    startTime: "23:00",
    endTime: "07:00",
    isActive: true,
  },
];