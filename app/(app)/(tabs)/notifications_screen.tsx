import { NotificationsTemplate } from "@/features/notifications/components/templates";

import { DeleteDialogProvider } from "@/features/notifications/context";

export default function NotificationsScreen() {
  return (
    <DeleteDialogProvider>
      <NotificationsTemplate />
    </DeleteDialogProvider>
  );
}
