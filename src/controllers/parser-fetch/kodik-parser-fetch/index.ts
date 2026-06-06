import Elysia from "elysia";
import { KodikApiResponse } from "../../../@types/types/kodik.type";
import { loadTranslations } from "../../../utils/cache/cache-translation";
import { prisma } from "../../../lib/prisma";

export const baseUrlKodikBz = "https://kodikapi.com";
export const KODIK_TOKEN = "a00105629be9abe0c3050189dfc26689";

// export const prisma = new PrismaClient({
//   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
// });

export const KodikParserLists = new Elysia({
  prefix: "/parser",
  name: "@controller/parser",
}).get("/kodik", async () => {
  try {
    const translations = await loadTranslations();
    const response = await fetch(
      `${baseUrlKodikBz}/list?token=${KODIK_TOKEN}&limit=50&type=anime-serial`,
    );
    if (!response.ok) {
      console.error(response.status);
      return [];
    }
    const data: KodikApiResponse = await response.json();
    const results = [];

    for (const item of data.results) {
      try {
        // здесь шики айди преобразовать из строки (получаемой в бд) в инт и проверить, иначе увидит ошибку
        if (!item.shikimori_id) {
          return [];
        }
        const shikimoriId = parseInt(item.shikimori_id);
        const translationTitle =
          translations.get(item.translation.id) || item.translation.title;

        // проверка существующих аниме тайтлов с шикимори в бд, чтобы запарсить
        const existingAnime = await prisma.anime.findUnique({
          where: { shikimoriId },
          include: { episodes: true },
        });

        // база, вернул весь результат
        await prisma.anime.update({
          where: { shikimoriId },
          data: {
            kodikId: item.id,
            kinopoiskId: item.kinopoisk_id ? parseInt(item.kinopoisk_id) : null,
            imdbId: item.imdb_id,
            episodesCount: item.episodes_count,
            hasLgbt: item.lgbt,
          },
        });

        const translator = await prisma.translator.upsert({
          where: { title: translationTitle },
          update: {},
          create: { title: translationTitle },
        });

        const playerUrl = `https:${item.link}`;
      } catch (e) {
        console.error(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
});

// export const parserKodik: KodikAnime[] = [];

// const KodikParserToGoing = async (): Promise<KodikAnime[]> => {
//   try {
//     const response = await fetch(
//       `${baseUrlKodikBz}/list?token=${KODIK_TOKEN}&limit=50&type=anime-serial`,
//     );

//     if (!response.ok) {
//       console.error(`HTTP error! status: ${response.status}`);
//       return [];
//     }

//     const apiResponse: KodikApiResponse = await response.json();

//     const parsed: KodikAnime[] = apiResponse.results
//       .filter((item) => item.type === "anime-serial")
//       .map((item) => ({
//         kodikId: item.id,
//         shikimoriId: item.shikimori_id,
//         title: item.title,
//         titleOrig: item.title_orig,
//         otherTitle: item.other_title,
//         year: item.year,
//         episodesCount: item.episodes_count,
//         translation: item.translation,
//         quality: item.quality,
//         screenshots: item.screenshots,
//         link: `https:${item.link}`,
//       }));

//     parserKodik.length = 0;
//     parserKodik.push(...parsed);

//     return parsed;
//   } catch (e) {
//     console.error(e);
//     return [];
//   }
// };

// export const KodikParserLists = new Elysia({
//   prefix: "/kodik",
//   name: "@controller/kodik",
// })
//   .get("/fetch", async () => {
//     const result = await KodikParserToGoing();
//     return { status: true, data: result, count: result.length };
//   })
//   .get("/list", () => {
//     return { data: parserKodik };
//   })
//   .get("/:id", ({ params: { id } }) => {
//     const anime = parserKodik.find((a) => a.kodikId === id);
//     return { data: anime };
//   });
