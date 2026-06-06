import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const AnimeRating = t.Union(
  [
    t.Literal("SAFE"),
    t.Literal("SUGGESTIVE"),
    t.Literal("QUESTIONABLE"),
    t.Literal("EXPLICIT"),
  ],
  { additionalProperties: false },
);
