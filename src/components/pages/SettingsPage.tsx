import { Button, Card } from "@dasjideepak/mf-shared-ui";
import type { SharedDashboardState } from "@dasjideepak/mf-shared-ui";

interface SettingsPageProps {
  sharedState: SharedDashboardState;
}

export function SettingsPage({ sharedState }: SettingsPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Admin Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Configure shared state and platform settings.
        </p>
      </div>

      <Card
        title="Theme Preference"
        subtitle="Toggle between light and dark mode across all apps."
      >
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">
            Current: <strong className="capitalize">{sharedState.theme}</strong>
          </span>
          <Button
            size="sm"
            variant="secondary"
            onClick={sharedState.toggleTheme}
          >
            Switch to {sharedState.theme === "light" ? "Dark" : "Light"}
          </Button>
        </div>
      </Card>

      <Card
        title="Broadcast Notification"
        subtitle="Push a platform-wide notification from admin."
      >
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={() =>
              sharedState.addNotification(
                "Scheduled maintenance at 2 AM UTC",
                "warning"
              )
            }
          >
            Maintenance Alert
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              sharedState.addNotification(
                "Platform updated to v2.1.0",
                "success"
              )
            }
          >
            Release Note
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() =>
              sharedState.addNotification(
                "Unauthorized access attempt detected",
                "error"
              )
            }
          >
            Security Alert
          </Button>
        </div>
      </Card>
    </div>
  );
}
