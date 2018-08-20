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
const util = require("hexo-plugin-hierarchy-category")(hexo);

const hCateList = util.getHCategories();

const str = util.showHCategories(hCateList, cate=>cate.slug);
```

## API

### import library

```js
const getHCateHelpers = require("hexo-plugin-hierarchy-category")
// or with es6 module support:
import getHCateHelpers from "hexo-plugin-hierarchy-category";

// then you can init helper with param `hexo`

const util = getHCateHelpers(hexo); // hexo is global var.

// then you can call util.getHCategories() or util.showHCategories(...)
```

### Types

> for detailed type declarations see [*.d.ts of this project](index.d.ts)

#### Type `HexoHierarchyCategory`

```typescript
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
```

#### function `getHCategories`

```typescript
declare function getHCategories(): HexoHierarchyCategory[];
```

#### function `showHCategories `

```typescript
interface ShowHCCallback {
  (hc: HexoHierarchyCategory): string | [string, string];
}

declare function showHCategories(
  hcs: HexoHierarchyCategory[],
  /**
   * if this callback returns one string, then this string will be used.
   * if this callback returns an array of two strings, then strings[0] + hc.children's output + strings[1] will be used.
   */
  showHCCallback: ShowHCCallback
): string;
```

## Sample

```ejs
<ul class="dropdown-menu">
    
    <%- showHCategories(getHCategories(), cate => [`
        <li>
            <a class="sidebar_archives-link" href="${cate.permalink}">
                <span>${cate.name}</span>
                <span class="sidebar_archives-count">${cate.length}</span>
            </a>
            <ul class="children-category-list">
            `,
            `</ul></li>`]) %>
</ul>
```

This will output a category list hierarchically in html.

For example:

A site has categories:

> - cateA
>   - cateA-1
>     - cateA-1-1
>   - cateA-2
> - cateB

Output will be: 

```html
<ul>
<li>
    <a class="sidebar_archives-link" href="https://xxx/categories/cateA/">
        <span>cateA</span>
        <span class="sidebar_archives-count">9</span>
    </a>
    <ul class="children-category-list">
        <li>
            <a class="sidebar_archives-link" href="https://xxx/categories/cateA-1/">
                <span>cateA-1</span>
                <span class="sidebar_archives-count">3</span>
            </a>
            <ul class="children-category-list">
                <li>
                    <a class="sidebar_archives-link" href="https://xxx/categories/cateA-1-1/">
                        <span>cateA-1-1</span>
                        <span class="sidebar_archives-count">1</span>
                    </a>
                    <ul class="children-category-list"></ul>
                </li>
            </ul>
        </li>
        <li>
            <a class="sidebar_archives-link" href="https://xxx/categories/cateA-2/">
                <span>cateA-2</span>
                <span class="sidebar_archives-count">3</span>
            </a>
            <ul class="children-category-list"></ul>
        </li>
    </ul>
</li>
<li>
    <a class="sidebar_archives-link" href="https://xxx/categories/cateB/">
        <span>cateB</span>
        <span class="sidebar_archives-count">3</span>
    </a>
    <ul class="children-category-list"></ul>
</li>
</ul>
```

