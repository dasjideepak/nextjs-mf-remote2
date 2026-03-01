import { Card, Badge, SectionHeader } from "@dasjideepak/mf-shared-ui";
import type { DashboardSharedState } from "@/types/hostGlobalState";
import type { DummyUser } from "@/hooks/useUsers";
import Image from "next/image";

interface OverviewPageProps {
  sharedState: DashboardSharedState;
  users: DummyUser[];
  usersLoading: boolean;
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="flex-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
    </Card>
  );
}

export function OverviewPage({
  sharedState,
  users,
  usersLoading,
}: OverviewPageProps) {
  const males = users.filter((u) => u.gender === "male").length;
  const females = users.filter((u) => u.gender === "female").length;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Admin Overview"
        description="Platform-wide metrics and management summary."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Users"
          value={usersLoading ? "..." : users.length}
        />
        <StatCard
          label="Male / Female"
          value={usersLoading ? "..." : `${males} / ${females}`}
        />
        <StatCard
          label="Notifications"
          value={sharedState.notifications.length}
        />
      </div>

      <Card title="All Users" subtitle="Quick view of first 5 users">
        <div className="mt-2 divide-y divide-gray-100">
          {usersLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 py-3">
                  <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3.5 w-32 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-48 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              ))
            : users.slice(0, 5).map((u) => (
                <div key={u.id} className="flex items-center gap-3 py-3">
                  <Image
                    src={u.image}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full bg-gray-100 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {u.firstName} {u.lastName}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {u.email} · {u.company.name}
                    </p>
                  </div>
                  <Badge variant={u.age >= 30 ? "green" : "blue"}>
                    {u.company.title}
                  </Badge>
                </div>
              ))}
        </div>
      </Card>
    </div>
  );
}
