import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const AnimeType = t.Union(
  [
    t.Literal("TV"),
    t.Literal("MOVIE"),
    t.Literal("OVA"),
    t.Literal("ONA"),
    t.Literal("SPECIAL"),
    t.Literal("MUSIC"),
    t.Literal("PV"),
    t.Literal("CM"),
  ],
  { additionalProperties: false },
);
