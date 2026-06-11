export const mapShikimoriStatus = (
  status: string,
): "ANNOUNCE" | "ONGOING" | "RELEASED" => {
  switch (status) {
    case "anons":
      return "ANNOUNCE";
    case "ongoing":
      return "ONGOING";
    case "released":
      return "RELEASED";
    default:
      return "ONGOING";
  }
};

export const mapShikimoriKind = (
  kind: string,
): "TV" | "MOVIE" | "OVA" | "ONA" | "SPECIAL" | "MUSIC" | "PV" | "CM" => {
  const map: Record<string, any> = {
    tv: "TV",
    movie: "MOVIE",
    ova: "OVA",
    ona: "ONA",
    special: "SPECIAL",
    music: "MUSIC",
    pv: "PV",
    cm: "CM",
  };
  return map[kind] || "TV";
};

const DEMOGRAPHIC_GENRES = new Set([
  "shounen",
  "shoujo",
  "seinen",
  "josei",
  "kids",
]);

export const mapShikimoriGenreType = (
  genreName: string,
): "DEMOGRAPHIC" | "GENRE" => {
  return DEMOGRAPHIC_GENRES.has(genreName.toLowerCase())
    ? "DEMOGRAPHIC"
    : "GENRE";
};

export const mapShikimoriRating = (
  rating: string,
): "SAFE" | "SUGGESTIVE" | "QUESTIONABLE" | "EXPLICIT" => {
  switch (rating) {
    case "g":
    case "pg":
      return "SAFE";
    case "pg_13":
      return "SUGGESTIVE";
    case "r":
      return "QUESTIONABLE";
    case "r_plus":
    case "rx":
      return "EXPLICIT";
    default:
      return "SAFE";
  }
};

