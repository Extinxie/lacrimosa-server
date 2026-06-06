import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const VideoPlain = t.Object(
  {
    id: t.String(),
    url: t.String(),
    title: t.String(),
    playerUrl: t.String(),
    imageUrl: t.String(),
    animeId: t.String(),
    createdAt: t.Date(),
    updatedAt: __nullable__(t.Date()),
  },
  { additionalProperties: false },
);

export const VideoRelations = t.Object(
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
  },
  { additionalProperties: false },
);

export const VideoPlainInputCreate = t.Object(
  {
    url: t.String(),
    title: t.String(),
    playerUrl: t.String(),
    imageUrl: t.String(),
  },
  { additionalProperties: false },
);

export const VideoPlainInputUpdate = t.Object(
  {
    url: t.Optional(t.String()),
    title: t.Optional(t.String()),
    playerUrl: t.Optional(t.String()),
    imageUrl: t.Optional(t.String()),
  },
  { additionalProperties: false },
);

export const VideoRelationsInputCreate = t.Object(
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
  },
  { additionalProperties: false },
);

export const VideoRelationsInputUpdate = t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const VideoWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          url: t.String(),
          title: t.String(),
          playerUrl: t.String(),
          imageUrl: t.String(),
          animeId: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Video" },
  ),
);

export const VideoWhereUnique = t.Recursive(
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
              url: t.String(),
              title: t.String(),
              playerUrl: t.String(),
              imageUrl: t.String(),
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
  { $id: "Video" },
);

export const VideoSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      url: t.Boolean(),
      title: t.Boolean(),
      playerUrl: t.Boolean(),
      imageUrl: t.Boolean(),
      anime: t.Boolean(),
      animeId: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const VideoInclude = t.Partial(
  t.Object(
    { anime: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const VideoOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      url: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      title: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      playerUrl: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      imageUrl: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Video = t.Composite([VideoPlain, VideoRelations], {
  additionalProperties: false,
});

export const VideoInputCreate = t.Composite(
  [VideoPlainInputCreate, VideoRelationsInputCreate],
  { additionalProperties: false },
);

export const VideoInputUpdate = t.Composite(
  [VideoPlainInputUpdate, VideoRelationsInputUpdate],
  { additionalProperties: false },
);
