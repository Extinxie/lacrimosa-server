import { KodikTranslationsResponse } from "../../@types/types/kodik.type";
import { baseUrlKodikBz } from "../../controllers/parser-fetch/kodik-parser-fetch";

let translationsCache: Map<number, string> | null = null;

export async function loadTranslations(): Promise<Map<number, string>> {
  if (translationsCache) return translationsCache;

  const KODIK_TOKEN = process.env.KODIK_TOKEN;
  if (!KODIK_TOKEN) return new Map();

  try {
    const response = await fetch(
      `${baseUrlKodikBz}/translations/v2?token=${KODIK_TOKEN}`,
    );

    if (!response.ok) throw new Error(`${response.status}`);

    const data: KodikTranslationsResponse = await response.json();

    translationsCache = new Map(data.results.map((t) => [t.id, t.title]));
    return translationsCache;
  } catch (e) {
    console.error(e);
    return new Map();
  }
}
