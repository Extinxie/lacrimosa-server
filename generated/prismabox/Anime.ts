import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const AnimePlain = t.Object(
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
);

export const AnimeRelations = t.Object(
  {
    licensors: t.Array(
      t.Object(
        {
          id: t.String(),
          countries: t.Array(t.String(), { additionalProperties: false }),
          title: t.String(),
          createdAt: t.Date(),
          updatedAt: __nullable__(t.Date()),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    episodes: t.Array(
      t.Object(
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
      { additionalProperties: false },
    ),
    tags: t.Array(
      t.Object(
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
      ),
      { additionalProperties: false },
    ),
    studios: t.Array(
      t.Object(
        {
          id: t.String(),
          title: t.String(),
          createdAt: t.Date(),
          updatedAt: __nullable__(t.Date()),
        },
        { additionalProperties: false },
      ),
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
    videos: t.Array(
      t.Object(
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
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const AnimePlainInputCreate = t.Object(
  {
    slug: t.String(),
    nativeTitle: t.String(),
    russianTitle: t.Optional(__nullable__(t.String())),
    englishTitle: t.Optional(__nullable__(t.String())),
    poster: t.Optional(__nullable__(t.String())),
    banner: t.Optional(__nullable__(t.String())),
    description: t.Optional(__nullable__(t.String())),
    synonyms: t.Array(t.String(), { additionalProperties: false }),
    note: t.Optional(__nullable__(t.String())),
    hashtag: t.Optional(__nullable__(t.String())),
    country: t.Optional(
      t.Union(
        [
          t.Literal("OTHER"),
          t.Literal("JAPAN"),
          t.Literal("CHINA"),
          t.Literal("KOREA"),
        ],
        { additionalProperties: false },
      ),
    ),
    status: t.Optional(
      t.Union(
        [t.Literal("ANNOUNCE"), t.Literal("ONGOING"), t.Literal("RELEASED")],
        { additionalProperties: false },
      ),
    ),
    type: t.Optional(
      t.Union(
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
    ),
    rating: t.Optional(
      t.Union(
        [
          t.Literal("SAFE"),
          t.Literal("SUGGESTIVE"),
          t.Literal("QUESTIONABLE"),
          t.Literal("EXPLICIT"),
        ],
        { additionalProperties: false },
      ),
    ),
    season: t.Optional(
      __nullable__(
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
    ),
    year: t.Optional(__nullable__(t.Integer())),
    airedOn: t.Optional(__nullable__(t.Date())),
    releasedOn: t.Optional(__nullable__(t.Date())),
    nextEpisodeAt: t.Optional(__nullable__(t.Date())),
    episodesCount: t.Optional(__nullable__(t.Integer())),
    episodesAired: t.Optional(__nullable__(t.Integer())),
    duration: t.Optional(__nullable__(t.Integer())),
    shikimoriRating: t.Optional(t.Number()),
    myanimelistRating: t.Optional(t.Number()),
    anilistRating: t.Optional(t.Integer()),
    kinopoiskRating: t.Optional(t.Number()),
    imdbRating: t.Optional(t.Number()),
    averageRating: t.Optional(t.Number()),
    bayesianRating: t.Optional(t.Number()),
    hasLgbt: t.Optional(t.Boolean()),
    isCensored: t.Optional(t.Boolean()),
    isDeleted: t.Optional(t.Boolean()),
    deletedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const AnimePlainInputUpdate = t.Object(
  {
    slug: t.Optional(t.String()),
    nativeTitle: t.Optional(t.String()),
    russianTitle: t.Optional(__nullable__(t.String())),
    englishTitle: t.Optional(__nullable__(t.String())),
    poster: t.Optional(__nullable__(t.String())),
    banner: t.Optional(__nullable__(t.String())),
    description: t.Optional(__nullable__(t.String())),
    synonyms: t.Optional(t.Array(t.String(), { additionalProperties: false })),
    note: t.Optional(__nullable__(t.String())),
    hashtag: t.Optional(__nullable__(t.String())),
    country: t.Optional(
      t.Union(
        [
          t.Literal("OTHER"),
          t.Literal("JAPAN"),
          t.Literal("CHINA"),
          t.Literal("KOREA"),
        ],
        { additionalProperties: false },
      ),
    ),
    status: t.Optional(
      t.Union(
        [t.Literal("ANNOUNCE"), t.Literal("ONGOING"), t.Literal("RELEASED")],
        { additionalProperties: false },
      ),
    ),
    type: t.Optional(
      t.Union(
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
    ),
    rating: t.Optional(
      t.Union(
        [
          t.Literal("SAFE"),
          t.Literal("SUGGESTIVE"),
          t.Literal("QUESTIONABLE"),
          t.Literal("EXPLICIT"),
        ],
        { additionalProperties: false },
      ),
    ),
    season: t.Optional(
      __nullable__(
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
    ),
    year: t.Optional(__nullable__(t.Integer())),
    airedOn: t.Optional(__nullable__(t.Date())),
    releasedOn: t.Optional(__nullable__(t.Date())),
    nextEpisodeAt: t.Optional(__nullable__(t.Date())),
    episodesCount: t.Optional(__nullable__(t.Integer())),
    episodesAired: t.Optional(__nullable__(t.Integer())),
    duration: t.Optional(__nullable__(t.Integer())),
    shikimoriRating: t.Optional(t.Number()),
    myanimelistRating: t.Optional(t.Number()),
    anilistRating: t.Optional(t.Integer()),
    kinopoiskRating: t.Optional(t.Number()),
    imdbRating: t.Optional(t.Number()),
    averageRating: t.Optional(t.Number()),
    bayesianRating: t.Optional(t.Number()),
    hasLgbt: t.Optional(t.Boolean()),
    isCensored: t.Optional(t.Boolean()),
    isDeleted: t.Optional(t.Boolean()),
    deletedAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const AnimeRelationsInputCreate = t.Object(
  {
    licensors: t.Optional(
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
    episodes: t.Optional(
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
    tags: t.Optional(
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
    studios: t.Optional(
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
    videos: t.Optional(
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

export const AnimeRelationsInputUpdate = t.Partial(
  t.Object(
    {
      licensors: t.Partial(
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
      episodes: t.Partial(
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
      tags: t.Partial(
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
      studios: t.Partial(
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
      videos: t.Partial(
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

export const AnimeWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          slug: t.String(),
          shikimoriId: t.Integer(),
          myanimelistId: t.Integer(),
          anilistId: t.Integer(),
          anilibriaId: t.Integer(),
          kinopoiskId: t.Integer(),
          imdbId: t.String(),
          kodikId: t.String(),
          aksorId: t.String(),
          nativeTitle: t.String(),
          russianTitle: t.String(),
          englishTitle: t.String(),
          poster: t.String(),
          banner: t.String(),
          description: t.String(),
          synonyms: t.Array(t.String(), { additionalProperties: false }),
          note: t.String(),
          hashtag: t.String(),
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
          season: t.Union(
            [
              t.Literal("WINTER"),
              t.Literal("SPRING"),
              t.Literal("SUMMER"),
              t.Literal("AUTUMN"),
            ],
            { additionalProperties: false },
          ),
          year: t.Integer(),
          airedOn: t.Date(),
          releasedOn: t.Date(),
          nextEpisodeAt: t.Date(),
          episodesCount: t.Integer(),
          episodesAired: t.Integer(),
          duration: t.Integer(),
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
          updatedAt: t.Date(),
          deletedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Anime" },
  ),
);

export const AnimeWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.String(),
              slug: t.String(),
              shikimoriId: t.Integer(),
              myanimelistId: t.Integer(),
              anilistId: t.Integer(),
              anilibriaId: t.Integer(),
              kinopoiskId: t.Integer(),
              imdbId: t.String(),
              kodikId: t.String(),
              aksorId: t.String(),
            },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.String() }),
            t.Object({ slug: t.String() }),
            t.Object({ shikimoriId: t.Integer() }),
            t.Object({ myanimelistId: t.Integer() }),
            t.Object({ anilistId: t.Integer() }),
            t.Object({ anilibriaId: t.Integer() }),
            t.Object({ kinopoiskId: t.Integer() }),
            t.Object({ imdbId: t.String() }),
            t.Object({ kodikId: t.String() }),
            t.Object({ aksorId: t.String() }),
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
              slug: t.String(),
              shikimoriId: t.Integer(),
              myanimelistId: t.Integer(),
              anilistId: t.Integer(),
              anilibriaId: t.Integer(),
              kinopoiskId: t.Integer(),
              imdbId: t.String(),
              kodikId: t.String(),
              aksorId: t.String(),
              nativeTitle: t.String(),
              russianTitle: t.String(),
              englishTitle: t.String(),
              poster: t.String(),
              banner: t.String(),
              description: t.String(),
              synonyms: t.Array(t.String(), { additionalProperties: false }),
              note: t.String(),
              hashtag: t.String(),
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
              season: t.Union(
                [
                  t.Literal("WINTER"),
                  t.Literal("SPRING"),
                  t.Literal("SUMMER"),
                  t.Literal("AUTUMN"),
                ],
                { additionalProperties: false },
              ),
              year: t.Integer(),
              airedOn: t.Date(),
              releasedOn: t.Date(),
              nextEpisodeAt: t.Date(),
              episodesCount: t.Integer(),
              episodesAired: t.Integer(),
              duration: t.Integer(),
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
              updatedAt: t.Date(),
              deletedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Anime" },
);

export const AnimeSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      slug: t.Boolean(),
      shikimoriId: t.Boolean(),
      myanimelistId: t.Boolean(),
      anilistId: t.Boolean(),
      anilibriaId: t.Boolean(),
      kinopoiskId: t.Boolean(),
      imdbId: t.Boolean(),
      kodikId: t.Boolean(),
      aksorId: t.Boolean(),
      nativeTitle: t.Boolean(),
      russianTitle: t.Boolean(),
      englishTitle: t.Boolean(),
      poster: t.Boolean(),
      banner: t.Boolean(),
      description: t.Boolean(),
      synonyms: t.Boolean(),
      note: t.Boolean(),
      hashtag: t.Boolean(),
      country: t.Boolean(),
      status: t.Boolean(),
      type: t.Boolean(),
      rating: t.Boolean(),
      season: t.Boolean(),
      year: t.Boolean(),
      airedOn: t.Boolean(),
      releasedOn: t.Boolean(),
      nextEpisodeAt: t.Boolean(),
      episodesCount: t.Boolean(),
      episodesAired: t.Boolean(),
      duration: t.Boolean(),
      shikimoriRating: t.Boolean(),
      myanimelistRating: t.Boolean(),
      anilistRating: t.Boolean(),
      kinopoiskRating: t.Boolean(),
      imdbRating: t.Boolean(),
      averageRating: t.Boolean(),
      bayesianRating: t.Boolean(),
      hasLgbt: t.Boolean(),
      isCensored: t.Boolean(),
      isDeleted: t.Boolean(),
      licensors: t.Boolean(),
      episodes: t.Boolean(),
      tags: t.Boolean(),
      studios: t.Boolean(),
      screenshots: t.Boolean(),
      videos: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      deletedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const AnimeInclude = t.Partial(
  t.Object(
    {
      country: t.Boolean(),
      status: t.Boolean(),
      type: t.Boolean(),
      rating: t.Boolean(),
      season: t.Boolean(),
      licensors: t.Boolean(),
      episodes: t.Boolean(),
      tags: t.Boolean(),
      studios: t.Boolean(),
      screenshots: t.Boolean(),
      videos: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const AnimeOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      slug: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      shikimoriId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      myanimelistId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      anilistId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      anilibriaId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      kinopoiskId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      imdbId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      kodikId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      aksorId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      nativeTitle: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      russianTitle: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      englishTitle: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      poster: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      banner: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      description: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      synonyms: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      note: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      hashtag: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      year: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      airedOn: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      releasedOn: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      nextEpisodeAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      episodesCount: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      episodesAired: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      duration: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      shikimoriRating: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      myanimelistRating: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      anilistRating: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      kinopoiskRating: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      imdbRating: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      averageRating: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      bayesianRating: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      hasLgbt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isCensored: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isDeleted: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      deletedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Anime = t.Composite([AnimePlain, AnimeRelations], {
  additionalProperties: false,
});

export const AnimeInputCreate = t.Composite(
  [AnimePlainInputCreate, AnimeRelationsInputCreate],
  { additionalProperties: false },
);

export const AnimeInputUpdate = t.Composite(
  [AnimePlainInputUpdate, AnimeRelationsInputUpdate],
  { additionalProperties: false },
);
