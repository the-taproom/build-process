Shopify projects rely on settings which are often referenced by javascript or css
for different functionality. To use processors like Babel on a project, we can't
have liquid tags on the file, but we don't want to lose the flexibility to
reference settings made from the Theme Editor.

The solution is to expose settings globally by using a snippet, then
reference them in a more javascript-y or css-y way throughout our project.

Some themes may already be implementing this concept (we learned it from Out of
the Sandbox), others you may need to add it in first. With all the tooling in
the javascript and scss/css ecosystems, keeping liquid out of non-liquid files
allows us to actually use tooling to help our development process instead of
failing because of liquid tags.

See these snippets on Cacher for exact implementations:

Javascript - [https://snippets.cacher.io/snippet/26e943d324dec1b70d1bA](https://snippets.cacher.io/snippet/26e943d324dec1b70d1b)

CSS - [https://snippets.cacher.io/snippet/086bf54d9891b6c8bda5](https://snippets.cacher.io/snippet/086bf54d9891b6c8bda5)


