import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const TagPlain = t.Object(
  {
    id: t.String(),
    shikimoriId: t.Integer(),
    russianTitle: t.String(),
    englishTitle: t.String(),
    type: t.Union(
      [t.Literal("DEMOGRAPHIC"), t.Literal("GENRE"), t.Literal("THEME")],
      { additionalProperties: false },
    ),
    isRestricted: t.Boolean(),
    createdAt: t.Date(),
    updatedAt: __nullable__(t.Date()),
  },
  { additionalProperties: false },
);

export const TagRelations = t.Object(
  {
    animes: t.Array(
      t.Object(
        {
          id: t.String(),
          slug: t.String(),
          shikimoriId: t.Integer(),
          myanimelistId: t.Integer(),
          anilistId: __nullable__(t.Integer()),
          anilibriaId: __nullable__(t.Integer()),
          kinopoiskId: __nullable__(t.Integer()),
          imdbId: __nullable__(t.String()),
          kodikId: __nullable__(t.String()),
          aksorId: __nullable__(t.String()),
          nativeTitle: t.String(),
          russianTitle: __nullable__(t.String()),
          englishTitle: __nullable__(t.String()),
          poster: __nullable__(t.String()),
          banner: __nullable__(t.String()),
          description: __nullable__(t.String()),
          synonyms: t.Array(t.String(), { additionalProperties: false }),
          note: __nullable__(t.String()),
          hashtag: __nullable__(t.String()),
          country: t.Union(
            [
              t.Literal("OTHER"),
              t.Literal("JAPAN"),
              t.Literal("CHINA"),
              t.Literal("KOREA"),
            ],
            { additionalProperties: false },
          ),
          status: t.Union(
            [
              t.Literal("ANNOUNCE"),
              t.Literal("ONGOING"),
              t.Literal("RELEASED"),
            ],
            { additionalProperties: false },
          ),
          type: t.Union(
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
          ),
          rating: t.Union(
            [
              t.Literal("SAFE"),
              t.Literal("SUGGESTIVE"),
              t.Literal("QUESTIONABLE"),
              t.Literal("EXPLICIT"),
            ],
            { additionalProperties: false },
          ),
          season: __nullable__(
            t.Union(
              [
                t.Literal("WINTER"),
                t.Literal("SPRING"),
                t.Literal("SUMMER"),
                t.Literal("AUTUMN"),
              ],
              { additionalProperties: false },
            ),
          ),
          year: __nullable__(t.Integer()),
          airedOn: __nullable__(t.Date()),
          releasedOn: __nullable__(t.Date()),
          nextEpisodeAt: __nullable__(t.Date()),
          episodesCount: __nullable__(t.Integer()),
          episodesAired: __nullable__(t.Integer()),
          duration: __nullable__(t.Integer()),
          shikimoriRating: t.Number(),
          myanimelistRating: t.Number(),
          anilistRating: t.Integer(),
          kinopoiskRating: t.Number(),
          imdbRating: t.Number(),
          averageRating: t.Number(),
          bayesianRating: t.Number(),
          hasLgbt: t.Boolean(),
          isCensored: t.Boolean(),
          isDeleted: t.Boolean(),
          createdAt: t.Date(),
          updatedAt: __nullable__(t.Date()),
          deletedAt: __nullable__(t.Date()),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const TagPlainInputCreate = t.Object(
  {
    russianTitle: t.String(),
    englishTitle: t.String(),
    type: t.Union(
      [t.Literal("DEMOGRAPHIC"), t.Literal("GENRE"), t.Literal("THEME")],
      { additionalProperties: false },
    ),
    isRestricted: t.Optional(t.Boolean()),
  },
  { additionalProperties: false },
);

export const TagPlainInputUpdate = t.Object(
  {
    russianTitle: t.Optional(t.String()),
    englishTitle: t.Optional(t.String()),
    type: t.Optional(
      t.Union(
        [t.Literal("DEMOGRAPHIC"), t.Literal("GENRE"), t.Literal("THEME")],
        { additionalProperties: false },
      ),
    ),
    isRestricted: t.Optional(t.Boolean()),
  },
  { additionalProperties: false },
);

export const TagRelationsInputCreate = t.Object(
  {
    animes: t.Optional(
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

export const TagRelationsInputUpdate = t.Partial(
  t.Object(
    {
      animes: t.Partial(
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

export const TagWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          shikimoriId: t.Integer(),
          russianTitle: t.String(),
          englishTitle: t.String(),
          type: t.Union(
            [t.Literal("DEMOGRAPHIC"), t.Literal("GENRE"), t.Literal("THEME")],
            { additionalProperties: false },
          ),
          isRestricted: t.Boolean(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Tag" },
  ),
);

export const TagWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              shikimoriId: t.Integer(),
              russianTitle: t.String(),
              englishTitle: t.String(),
            },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({ shikimoriId: t.Integer() }),
            t.Object({ russianTitle: t.String() }),
            t.Object({ englishTitle: t.String() }),
          ],
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
              shikimoriId: t.Integer(),
              russianTitle: t.String(),
              englishTitle: t.String(),
              type: t.Union(
                [
                  t.Literal("DEMOGRAPHIC"),
                  t.Literal("GENRE"),
                  t.Literal("THEME"),
                ],
                { additionalProperties: false },
              ),
              isRestricted: t.Boolean(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Tag" },
);

export const TagSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      shikimoriId: t.Boolean(),
      russianTitle: t.Boolean(),
      englishTitle: t.Boolean(),
      type: t.Boolean(),
      isRestricted: t.Boolean(),
      animes: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const TagInclude = t.Partial(
  t.Object(
    { type: t.Boolean(), animes: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const TagOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      shikimoriId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      russianTitle: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      englishTitle: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isRestricted: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Tag = t.Composite([TagPlain, TagRelations], {
  additionalProperties: false,
});

export const TagInputCreate = t.Composite(
  [TagPlainInputCreate, TagRelationsInputCreate],
  { additionalProperties: false },
);

export const TagInputUpdate = t.Composite(
  [TagPlainInputUpdate, TagRelationsInputUpdate],
  { additionalProperties: false },
);
