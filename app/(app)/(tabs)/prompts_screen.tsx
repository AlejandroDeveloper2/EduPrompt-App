import { PromptsTemplate } from "@/features/prompts/components/templates";

import { DeleteDialogProvider } from "@/features/prompts/context";

export default function PromptsScreen() {
  return (
    <DeleteDialogProvider>
      <PromptsTemplate />
    </DeleteDialogProvider>
  );
}
