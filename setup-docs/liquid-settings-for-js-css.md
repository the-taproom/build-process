# Handling Theme Settings in Javascript and CSS Files

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

## Examples:

See these snippets on Cacher for exact implementations:

Javascript - [https://gist.github.com/kellyvaughn/4ff7dd4ec4ddbd78d195f584503da622](https://gist.github.com/kellyvaughn/4ff7dd4ec4ddbd78d195f584503da622)

CSS - [https://gist.github.com/kellyvaughn/7283c286e53d9f1c40ed5ff8e9beb9f1](https://gist.github.com/kellyvaughn/7283c286e53d9f1c40ed5ff8e9beb9f1)


