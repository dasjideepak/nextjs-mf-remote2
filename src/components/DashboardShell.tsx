import { useEffect, useState } from "react";
import { useSharedGlobalState } from "@/hooks/globalState";
import { useUsers } from "@/hooks/useUsers";
import type { SharedDashboardState } from "@dasjideepak/mf-shared-ui";
import {
  OverviewPage,
  UsersPage,
  NotificationsPage,
  ProfilePage,
} from "@/components/pages";
import { DashboardShellLayout } from "@/components/DashboardShellLayout";

interface DashboardShellProps {
  sharedState?: SharedDashboardState;
}

const BASE_PATH = "/dashboard";

const NAV_ITEMS = [
  { segment: "" as const, label: "Overview", icon: "grid" },
  { segment: "users" as const, label: "Users", icon: "users" },
  { segment: "notifications" as const, label: "Notifications", icon: "bell" },
  { segment: "profile" as const, label: "Profile", icon: "user" },
] as const;

type RouteSegment = (typeof NAV_ITEMS)[number]["segment"];

function getSegmentFromPath(pathname: string): string {
  if (!pathname.startsWith(BASE_PATH)) return "";
  const remainder = pathname.slice(BASE_PATH.length).replace(/^\/+/, "");
  return remainder.split("/")[0] ?? "";
}

export default function DashboardShell({ sharedState }: DashboardShellProps) {
  const { isLoading, state } = useSharedGlobalState();
  const resolvedState =
    sharedState ?? (state as SharedDashboardState | undefined);
  const [routeSegment, setRouteSegment] = useState<string>("");
  const { users, loading: usersLoading } = useUsers(30);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () =>
      setRouteSegment(getSegmentFromPath(window.location.pathname));
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const navigate = (segment: RouteSegment) => {
    if (typeof window === "undefined") return;
    const path = segment ? `${BASE_PATH}/${segment}` : BASE_PATH;
    window.history.pushState({}, "", path);
    setRouteSegment(segment);
  };

  if (isLoading && !sharedState) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-600" />
      </div>
    );
  }

  if (!resolvedState) {
    return (
      <div className="rounded-xl border-2 border-dashed border-yellow-300 bg-yellow-50 px-6 py-12 text-center">
        <p className="text-sm font-medium text-yellow-800">
          Unable to connect to host global state.
        </p>
      </div>
    );
  }

  const validSegments = NAV_ITEMS.map((i) => i.segment as string);

  return (
    <DashboardShellLayout
      navItems={NAV_ITEMS.map((item) => ({ ...item, segment: item.segment as string }))}
      routeSegment={routeSegment}
      notificationsCount={resolvedState.notifications.length}
      onNavigate={(segment) => navigate(segment as RouteSegment)}
      theme={{
        sidebarIntroClassName: "border-emerald-200 bg-emerald-50/70",
        activeItemClassName: "bg-emerald-100 text-emerald-800",
        mobileActiveItemClassName: "border-emerald-600 text-emerald-600",
      }}
    >
      {routeSegment === "" && (
        <OverviewPage
          sharedState={resolvedState}
          users={users}
          usersLoading={usersLoading}
        />
      )}
      {routeSegment === "users" && (
        <UsersPage users={users} usersLoading={usersLoading} />
      )}
      {routeSegment === "notifications" && (
        <NotificationsPage sharedState={resolvedState} />
      )}
      {routeSegment === "profile" && <ProfilePage />}
      {!validSegments.includes(routeSegment) && (
        <div className="rounded-xl border-2 border-dashed border-red-200 bg-red-50 px-6 py-12 text-center">
          <p className="text-sm font-medium text-red-800">
            Unknown route: /dashboard/{routeSegment}
          </p>
        </div>
      )}
    </DashboardShellLayout>
  );
}
