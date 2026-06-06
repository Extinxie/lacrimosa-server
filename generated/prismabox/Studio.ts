import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const StudioPlain = t.Object(
  {
    id: t.String(),
    title: t.String(),
    createdAt: t.Date(),
    updatedAt: __nullable__(t.Date()),
  },
  { additionalProperties: false },
);

export const StudioRelations = t.Object(
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

export const StudioPlainInputCreate = t.Object(
  { title: t.String() },
  { additionalProperties: false },
);

export const StudioPlainInputUpdate = t.Object(
  { title: t.Optional(t.String()) },
  { additionalProperties: false },
);

export const StudioRelationsInputCreate = t.Object(
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

export const StudioRelationsInputUpdate = t.Partial(
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

export const StudioWhere = t.Partial(
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
    { $id: "Studio" },
  ),
);

export const StudioWhereUnique = t.Recursive(
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
  { $id: "Studio" },
);

export const StudioSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      title: t.Boolean(),
      animes: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const StudioInclude = t.Partial(
  t.Object(
    { animes: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const StudioOrderBy = t.Partial(
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

export const Studio = t.Composite([StudioPlain, StudioRelations], {
  additionalProperties: false,
});

export const StudioInputCreate = t.Composite(
  [StudioPlainInputCreate, StudioRelationsInputCreate],
  { additionalProperties: false },
);

export const StudioInputUpdate = t.Composite(
  [StudioPlainInputUpdate, StudioRelationsInputUpdate],
  { additionalProperties: false },
);
