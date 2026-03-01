import type { ReactNode } from "react";
import { Bell, Grid2x2, User, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  segment: string;
  label: string;
  icon: string;
}

export interface DashboardShellLayoutAppearance {
  sidebarIntroClassName: string;
  activeItemClassName: string;
  mobileActiveItemClassName: string;
}

interface DashboardShellLayoutProps {
  navItems: NavItem[];
  routeSegment: string;
  notificationsCount: number;
  appearance: DashboardShellLayoutAppearance;
  onNavigate: (segment: string) => void;
  children: ReactNode;
}

const NAV_ICONS: Record<string, LucideIcon> = {
  grid: Grid2x2,
  users: Users,
  bell: Bell,
  user: User,
};

function NavIcon({ icon }: { icon: string }) {
  const Icon = NAV_ICONS[icon] ?? User;
  return <Icon className="h-4 w-4" aria-hidden="true" />;
}

export function DashboardShellLayout({
  navItems,
  routeSegment,
  notificationsCount,
  appearance,
  onNavigate,
  children,
}: DashboardShellLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] gap-6">
      <nav className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-24 space-y-3">
          <div className={`rounded-xl border p-4 ${appearance.sidebarIntroClassName}`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Admin Workspace
            </p>
            <p className="mt-1 text-sm font-medium text-gray-800">
              Manage users and notifications.
            </p>
          </div>

          {navItems.map((item) => {
            const isActive = routeSegment === item.segment;
            return (
              <button
                key={item.segment}
                type="button"
                onClick={() => onNavigate(item.segment)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? appearance.activeItemClassName
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <NavIcon icon={item.icon} />
                {item.label}
                {item.segment === "notifications" && notificationsCount > 0 && (
                  <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-100 px-1.5 text-xs font-semibold text-red-700">
                    {notificationsCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="flex-1">
        <div className="mb-4 flex gap-1 overflow-x-auto border-b border-gray-200 lg:hidden">
          {navItems.map((item) => {
            const isActive = routeSegment === item.segment;
            return (
              <button
                key={item.segment}
                type="button"
                onClick={() => onNavigate(item.segment)}
                className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? appearance.mobileActiveItemClassName
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          {children}
        </div>
      </div>
    </div>
  );
}
