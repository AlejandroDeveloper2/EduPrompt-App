import { z } from "zod";

import { i18n } from "@/core/store";

export const nameResourcesGroupSchema = z.object({
  groupName: z
    .string()
    .min(
      1,
      i18n.t(
        "resources_translations.name_group_template.form_error_messages.required_name_msg",
      ),
    ),
});

export type NameResourcesGroupFormData = z.infer<
  typeof nameResourcesGroupSchema
>;
