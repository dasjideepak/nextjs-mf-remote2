import { NotificationCenter, SectionHeader } from "@dasjideepak/mf-shared-ui";
import type { DashboardSharedState } from "@/types/hostGlobalState";

interface NotificationsPageProps {
  sharedState: DashboardSharedState;
}

export function NotificationsPage({ sharedState }: NotificationsPageProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SectionHeader
          title="Notifications"
          description="Shared across all remotes. Add one here, see it in Customer App too."
        />
      </div>
      <NotificationCenter
        state={sharedState}
        actions={[
          {
            label: "+ Warning",
            message: "New admin policy update published",
            type: "warning",
          },
          {
            label: "+ Success",
            message: "System backup completed successfully",
            type: "success",
            variant: "secondary",
          },
          {
            label: "+ Error",
            message: "Critical: database connection timeout",
            type: "error",
            variant: "danger",
          },
        ]}
        emptyMessage="No notifications yet. Add one from any remote."
      />
    </div>
  );
}
