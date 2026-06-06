import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TranslationPlain = t.Object(
  {
    id: t.String(),
    type: t.Union([t.Literal("VOICE"), t.Literal("SUBTITLES")], {
      additionalProperties: false,
    }),
    player: t.Union([t.Literal("KODIK"), t.Literal("LIBRIA")], {
      additionalProperties: false,
    }),
    source: t.Any(),
    episodeId: t.String(),
    translatorId: t.String(),
    createdAt: t.Date(),
    updatedAt: __nullable__(t.Date()),
  },
  { additionalProperties: false },
);

export const TranslationRelations = t.Object(
  {
    episode: t.Object(
      {
        id: t.String(),
        number: t.Integer(),
        duration: __nullable__(t.Integer()),
        animeId: t.String(),
        createdAt: t.Date(),
        updatedAt: __nullable__(t.Date()),
      },
      { additionalProperties: false },
    ),
    translator: t.Object(
      {
        id: t.String(),
        title: t.String(),
        createdAt: t.Date(),
        updatedAt: __nullable__(t.Date()),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const TranslationPlainInputCreate = t.Object(
  {
    type: t.Union([t.Literal("VOICE"), t.Literal("SUBTITLES")], {
      additionalProperties: false,
    }),
    player: t.Union([t.Literal("KODIK"), t.Literal("LIBRIA")], {
      additionalProperties: false,
    }),
    source: t.Any(),
  },
  { additionalProperties: false },
);

export const TranslationPlainInputUpdate = t.Object(
  {
    type: t.Optional(
      t.Union([t.Literal("VOICE"), t.Literal("SUBTITLES")], {
        additionalProperties: false,
      }),
    ),
    player: t.Optional(
      t.Union([t.Literal("KODIK"), t.Literal("LIBRIA")], {
        additionalProperties: false,
      }),
    ),
    source: t.Optional(t.Any()),
  },
  { additionalProperties: false },
);

export const TranslationRelationsInputCreate = t.Object(
  {
    episode: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
    translator: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const TranslationRelationsInputUpdate = t.Partial(
  t.Object(
    {
      episode: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
      translator: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
);

export const TranslationWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          type: t.Union([t.Literal("VOICE"), t.Literal("SUBTITLES")], {
            additionalProperties: false,
          }),
          player: t.Union([t.Literal("KODIK"), t.Literal("LIBRIA")], {
            additionalProperties: false,
          }),
          source: t.Any(),
          episodeId: t.String(),
          translatorId: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Translation" },
  ),
);

export const TranslationWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              type: t.Union([t.Literal("VOICE"), t.Literal("SUBTITLES")], {
                additionalProperties: false,
              }),
              player: t.Union([t.Literal("KODIK"), t.Literal("LIBRIA")], {
                additionalProperties: false,
              }),
              source: t.Any(),
              episodeId: t.String(),
              translatorId: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Translation" },
);

export const TranslationSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      type: t.Boolean(),
      player: t.Boolean(),
      source: t.Boolean(),
      episode: t.Boolean(),
      episodeId: t.Boolean(),
      translator: t.Boolean(),
      translatorId: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const TranslationInclude = t.Partial(
  t.Object(
    {
      type: t.Boolean(),
      player: t.Boolean(),
      episode: t.Boolean(),
      translator: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const TranslationOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      source: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      episodeId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      translatorId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Translation = t.Composite(
  [TranslationPlain, TranslationRelations],
  { additionalProperties: false },
);

export const TranslationInputCreate = t.Composite(
  [TranslationPlainInputCreate, TranslationRelationsInputCreate],
  { additionalProperties: false },
);

export const TranslationInputUpdate = t.Composite(
  [TranslationPlainInputUpdate, TranslationRelationsInputUpdate],
  { additionalProperties: false },
);
