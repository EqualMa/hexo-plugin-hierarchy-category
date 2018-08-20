import { HexoHierarchyCategory } from "./HCateType";

interface ShowHCCallback {
  (hc: HexoHierarchyCategory): string | [string, string];
}

interface FunctionGetHCateHelpers {
  (hexo): {
    /**
     * @returns a list of categories whose depth is 0.
     */
    getHCategories(): HexoHierarchyCategory[];
    showHCategories(
      hcs: HexoHierarchyCategory[],
      /**
       * if this callback returns one string, then this string will be used.
       * if this callback returns an array of two strings, then `strings[0] + hc.children's output + strings[1]` will be used.
       */
      showHCCallback: ShowHCCallback
    ): string;
  };
}

declare var getHCateHelpers: FunctionGetHCateHelpers;

export = getHCateHelpers;
