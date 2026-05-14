export type ShowcaseTag = "Marketplace" | "CurseForge" | "GitHub";

export interface ShowcaseEntry {
  name: string;
  image: string; // path under /medias/showcase/ or external URL
  tag: ShowcaseTag;
  url: string;
}

export const showcase: ShowcaseEntry[] = [
  {
    name: "Example Marketplace Pack",
    image: "/medias/showcase/placeholder.png",
    tag: "Marketplace",
    url: "https://www.minecraft.net/en-us/marketplace/pdp?id=aa1a855c-628e-48f2-bfdb-174bb25c45ab",
  },
];
