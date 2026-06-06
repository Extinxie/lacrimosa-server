import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TranslationPlayer = t.Union(
  [t.Literal("KODIK"), t.Literal("LIBRIA")],
  { additionalProperties: false },
);
