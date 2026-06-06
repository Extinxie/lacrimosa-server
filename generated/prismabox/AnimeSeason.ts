import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const AnimeSeason = t.Union(
  [
    t.Literal("WINTER"),
    t.Literal("SPRING"),
    t.Literal("SUMMER"),
    t.Literal("AUTUMN"),
  ],
  { additionalProperties: false },
);
