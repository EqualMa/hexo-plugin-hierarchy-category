# hexo-plugin-hierarchy-category


## Installation

In your hexo project, install hexo-plugin-hierarchy-category


```bash
npm install --save hexo-plugin-hierarchy-category

```

Then serve the site

```bash
hexo server
```

## Usage 

In your hexo site cinfig ('/_config.yml'):

```yml
hierarchy_category:
  enable_helper: true
```

Then 2 helpers will be registered in `hexo`:

`getHCategories`

`showHCategories`

Now you can use them in your templates! 

Also you can import these functions in your code, like:

```js
const util = require("hexo-plugin-hierarchy-category");

const hCateList = util.getHCategories();

const str = util.showHCategories(hCateList, cate=>cate.slug);
```
