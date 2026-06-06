import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const EpisodePlain = t.Object(
  {
    id: t.String(),
    number: t.Integer(),
    duration: __nullable__(t.Integer()),
    animeId: t.String(),
    createdAt: t.Date(),
    updatedAt: __nullable__(t.Date()),
  },
  { additionalProperties: false },
);

export const EpisodeRelations = t.Object(
  {
    anime: t.Object(
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
          [t.Literal("ANNOUNCE"), t.Literal("ONGOING"), t.Literal("RELEASED")],
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
    screenshots: t.Array(
      t.Object(
        {
          id: t.String(),
          originalUrl: t.String(),
          previewUrl: __nullable__(t.String()),
          animeId: __nullable__(t.String()),
          episodeId: __nullable__(t.String()),
          createdAt: t.Date(),
          updatedAt: __nullable__(t.Date()),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
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

export const EpisodePlainInputCreate = t.Object(
  { number: t.Integer(), duration: t.Optional(__nullable__(t.Integer())) },
  { additionalProperties: false },
);

export const EpisodePlainInputUpdate = t.Object(
  {
    number: t.Optional(t.Integer()),
    duration: t.Optional(__nullable__(t.Integer())),
  },
  { additionalProperties: false },
);

export const EpisodeRelationsInputCreate = t.Object(
  {
    anime: t.Object(
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
    screenshots: t.Optional(
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

export const EpisodeRelationsInputUpdate = t.Partial(
  t.Object(
    {
      anime: t.Object(
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
      screenshots: t.Partial(
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

export const EpisodeWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          number: t.Integer(),
          duration: t.Integer(),
          animeId: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Episode" },
  ),
);

export const EpisodeWhereUnique = t.Recursive(
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
              number: t.Integer(),
              duration: t.Integer(),
              animeId: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Episode" },
);

export const EpisodeSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      number: t.Boolean(),
      duration: t.Boolean(),
      anime: t.Boolean(),
      animeId: t.Boolean(),
      screenshots: t.Boolean(),
      translations: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const EpisodeInclude = t.Partial(
  t.Object(
    {
      anime: t.Boolean(),
      screenshots: t.Boolean(),
      translations: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const EpisodeOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      number: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      duration: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      animeId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Episode = t.Composite([EpisodePlain, EpisodeRelations], {
  additionalProperties: false,
});

export const EpisodeInputCreate = t.Composite(
  [EpisodePlainInputCreate, EpisodeRelationsInputCreate],
  { additionalProperties: false },
);

export const EpisodeInputUpdate = t.Composite(
  [EpisodePlainInputUpdate, EpisodeRelationsInputUpdate],
  { additionalProperties: false },
);
