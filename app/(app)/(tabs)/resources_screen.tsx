import { MyResourcesTemplate } from "@/features/educational-resources/components/templates";

import { DeleteDialogProvider } from "@/features/educational-resources/context";

export default function ResourcesScreen() {
  return (
    <DeleteDialogProvider>
      <MyResourcesTemplate />
    </DeleteDialogProvider>
  );
}
