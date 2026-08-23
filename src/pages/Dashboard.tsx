import StatCard from "../components/dashboard/StatCard";
import RecentCharts from "../components/dashboard/RecentCharts";

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Overview of your duty chart management system.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Stations"
          value={5}
          description="Active stations"
        />

        <StatCard
          title="Employees"
          value={42}
          description="Registered employees"
        />

        <StatCard
          title="Duty Charts"
          value={18}
          description="Created charts"
        />

        <StatCard
          title="Templates"
          value={6}
          description="Available templates"
        />
      </div>

      {/* Recent Charts */}

      <RecentCharts />

      {/* Create Chart */}

      <div className="flex justify-end">
        <button className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700">
          + Create Duty Chart
        </button>
      </div>
    </div>
  );
}

export default Dashboard;