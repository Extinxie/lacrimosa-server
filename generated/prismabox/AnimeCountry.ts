import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const AnimeCountry = t.Union(
  [
    t.Literal("OTHER"),
    t.Literal("JAPAN"),
    t.Literal("CHINA"),
    t.Literal("KOREA"),
  ],
  { additionalProperties: false },
);
