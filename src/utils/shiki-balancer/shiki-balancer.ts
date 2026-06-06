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

// const dataAnimesForSlug

