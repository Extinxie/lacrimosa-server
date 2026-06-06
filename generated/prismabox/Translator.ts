import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TranslatorPlain = t.Object(
  {
    id: t.String(),
    title: t.String(),
    createdAt: t.Date(),
    updatedAt: __nullable__(t.Date()),
  },
  { additionalProperties: false },
);

export const TranslatorRelations = t.Object(
  {
    translations: t.Array(
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
          updatedAt: __nullable__(t.Date()),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const TranslatorPlainInputCreate = t.Object(
  { title: t.String() },
  { additionalProperties: false },
);

export const TranslatorPlainInputUpdate = t.Object(
  { title: t.Optional(t.String()) },
  { additionalProperties: false },
);

export const TranslatorRelationsInputCreate = t.Object(
  {
    translations: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const TranslatorRelationsInputUpdate = t.Partial(
  t.Object(
    {
      translations: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const TranslatorWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          title: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Translator" },
  ),
);

export const TranslatorWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), title: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ title: t.String() })],
          { additionalProperties: false },
        ),
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
              title: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Translator" },
);

export const TranslatorSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      title: t.Boolean(),
      translations: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const TranslatorInclude = t.Partial(
  t.Object(
    { translations: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const TranslatorOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      title: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Translator = t.Composite([TranslatorPlain, TranslatorRelations], {
  additionalProperties: false,
});

export const TranslatorInputCreate = t.Composite(
  [TranslatorPlainInputCreate, TranslatorRelationsInputCreate],
  { additionalProperties: false },
);

export const TranslatorInputUpdate = t.Composite(
  [TranslatorPlainInputUpdate, TranslatorRelationsInputUpdate],
  { additionalProperties: false },
);
