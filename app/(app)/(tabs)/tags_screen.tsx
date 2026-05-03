import { TagsTemplate } from "@/features/tags/components/templates";

import { DeleteDialogProvider } from "@/features/tags/context";

export default function TagsScreen() {
  return (
    <DeleteDialogProvider>
      <TagsTemplate />
    </DeleteDialogProvider>
  );
}
