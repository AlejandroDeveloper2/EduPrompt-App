import { useEmitUserProfileUpdated } from "@/features/settings/hooks/core";

import { DashboardTemplate } from "@/features/dashboard/components/templates";

export default function DashboardScreen() {
  useEmitUserProfileUpdated();
  return <DashboardTemplate />;
}
