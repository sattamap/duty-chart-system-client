interface DutyChart {
  id: number;
  station: string;
  period: string;
  status: "Published" | "Draft";
}

const recentCharts: DutyChart[] = [
  {
    id: 1,
    station: "Chattogram Station",
    period: "23 Aug - 29 Aug 2026",
    status: "Published",
  },
  {
    id: 2,
    station: "Dhaka Station",
    period: "23 Aug - 29 Aug 2026",
    status: "Draft",
  },
  {
    id: 3,
    station: "Rajshahi Station",
    period: "16 Aug - 22 Aug 2026",
    status: "Published",
  },
];

function RecentCharts() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h2 className="text-lg font-semibold text-slate-800">
          Recent Duty Charts
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Recently created and updated duty charts.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-5 py-3 font-medium">
                Station
              </th>

              <th className="px-5 py-3 font-medium">
                Period
              </th>

              <th className="px-5 py-3 font-medium">
                Status
              </th>

              <th className="px-5 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {recentCharts.map((chart) => (
              <tr
                key={chart.id}
                className="border-t border-slate-200"
              >
                <td className="px-5 py-4 font-medium text-slate-800">
                  {chart.station}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {chart.period}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      chart.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {chart.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <button className="font-medium text-blue-600 hover:text-blue-800">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentCharts;