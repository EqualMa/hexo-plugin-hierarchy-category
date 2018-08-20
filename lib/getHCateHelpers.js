function getHCateHelpers(hexo) {
    function getHCategories() {
      const temp = [];
  
      const categories = hexo.locals.get("categories");
      categories.toArray().forEach(cate => {
        const depthPath = cate.slug.split("/");
        const depth = depthPath.length - 1;
  
        const hc = {
          name: cate.name,
          slug: cate.slug,
          path: cate.path,
          permalink: cate.permalink,
          length: cate.length,
          depth: depth,
          depthPath: depthPath,
          children: [],
          childMap: {}
        };
  
        if (!temp[depth]) temp[depth] = [];
  
        temp[depth].push(hc);
  
        temp[depth - 1] &&
          temp[depth - 1].forEach(parent => {
            if (parent.name === hc.depthPath[depth - 1]) {
              parent.children.push(hc);
              parent.childMap[hc.name] = hc;
            }
          });
      });
  
      const r = temp[0] || [];
  
      return r;
    }
  
    function showHCategories(hcs, showHCCallback) {
      const showHC =
        typeof showHCCallback === "function" ? showHCCallback : () => "";
  
      function showHCWithChildren(hc, showHC) {
        const thisStrings = showHC(hc);
        const childrenString =
          Array.isArray(hc.children) && hc.children.length > 0
            ? hc.children.map(hcc => showHCWithChildren(hcc, showHC)).join("")
            : "";
        return typeof thisStrings === "string"
          ? thisStrings + childrenString
          : Array.isArray(thisStrings)
            ? (thisStrings[0] || "") + childrenString + (thisStrings[1] || "")
            : "";
      }
  
      return Array.isArray(hcs)
        ? hcs.map(hc => showHCWithChildren(hc, showHC)).join("")
        : "";
    }
  
    return { getHCategories: getHCategories, showHCategories: showHCategories };
  }
  
  module.exports = getHCateHelpers;
  