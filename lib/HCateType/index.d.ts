export type HexoCategoryName = string;
export type HexoCategorySlug = string;
export interface HexoVanillaCategory {
  name: HexoCategoryName;
  slug: HexoCategorySlug;
  path: string;
  permalink: string;
  length: number;
}

export interface HexoHierarchyCategory extends HexoVanillaCategory {
  depth: number;
  depthPath: HexoCategoryName[];
  childMap: { [childCategoryNameName: string]: HexoHierarchyCategory };
  children: HexoHierarchyCategory[];
}
