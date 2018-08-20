var getHCateHelpers = require("./lib/getHCateHelpers");

console.group("hexo-plugin-hierarchy-category");

(function init() {
  if (typeof hexo === "undefined") {
    console.warn(
      "Global hexo not found. This plugin only works as a dependency library."
    );
    return;
  }

  const pluginConfig = hexo.config.hierarchy_category;

  if (!pluginConfig) {
    console.warn(
      "plugin config not specified.\n",
      "You can config like the following:\n",
      `
hierarchy_category:
  enable_helper: true
      `.trim()
    );

    return;
  }

  const hCateHelpers = getHCateHelpers(hexo);

  if (pluginConfig.enable_helper) {
    hexo.extend.helper.register("getHCategories", hCateHelpers.getHCategories);

    hexo.extend.helper.register(
      "showHCategories",
      hCateHelpers.showHCategories
    );
  }
})();

console.groupEnd();

module.exports = getHCateHelpers;
