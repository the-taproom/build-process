# Build Process

This build process aims to be an agnostic way to ensure modern features in our
Shopify projects. It is entirely opt-in. This enables it to be dropped into an
existing theme but only affect new files created in the scripts/styles folders.
Any old assets wouldn't be converted to build process unless explicitly done so.
This also allows one to 'opt-out' of the process during development if needed.
so at any point, a file can be moved back to `assets`, `theme.liquid` file
reference updated, and theme deployed to circumvent the build process.

## Overview

### Scripts and Styles folders

The root directory for these folders will be iterated through on build. Each file
located in root will have an equitable `.min` file created for it in the assets
folder. This separation provides the opportunity to only load the scripts and styles
needed for a specific page instead of requiring all assets for the entire site at
one time. For the components that need to be on every page, you can do this by
creating a subdirectory in the `scripts` or `styles` folder and importing it to
a `main.scss`/`theme.scss`/`index.js`/`theme.js` file in the root of the parent
directory.

The build process is possible because these are javascript and scss files, 
not `.liquid` files. Liquid in the build process files will keep it from
working. If `.js.liquid`, `.css.liquid` or `.scss.liquid` files need to be moved
over, please follow [this process](./setup-docs/liquid-settings-for-js-css.md) for sanitizing the files of liquid and
referencing them in a way the build process can handle.


### File Structure

Potential file structure for a project:

``` html
|-- YourProject
    |-- assets
        |-- index.min.js
        |-- my-page.min.js
        |-- product.min.js
        |-- main.min.css
        |-- my-page.min.css
        |-- product.min.css
    |-- config
    |-- layout
        | theme.liquid (references .min files in assets)
    |-- locales
    |-- scripts
        |-- components
            |-- header.js
        |-- index.js (includes header.js)
        |-- my-page.js
        |-- product.js
    |-- snippets
    |-- styles
        |-- components
            |-- header.scss
        |-- main.scss (includes header.scss)
        |-- my-page.scss
        |-- product.scss
    |-- templates

```

## Essential Setup

### Setup in New Project

1. Setup project (recommend [Skeleton Theme](https://github.com/Shopify/skeleton-theme/tree/master/src/styles))
2. Clone this repo
3. (If needed) Install bundler 2 - `gem install bundler` 
4. Install gems - `bundle install`
5. Run `ruby build_process_app.rb migrate [PATH_TO_PROJECT_DIR]` to copy files
from `build-process-files` to the directory of your project
6. Add `main.scss` to `styles` folder

(Optional)
7. Add `index.js` to `scripts` folder

### Setup in Existing Project

1. Clone this repo
2. (If needed) Install bundler 2 - `gem install bundler`  
3. Install gems - `bundle install`
4. Run `ruby build_process_app.rb migrate [PATH_TO_PROJECT_DIR]` to copy files
from `build-process-files` to the directory of your project
5. Move to the folder of the theme you downloaded
6. Add `main.scss` to `styles` folder

(Optional)
7. Add `index.js` to `scripts` folder

### Next Steps

1. Add snippet `css-variables.liquid` to snippets folder
    - This file allow us to sanitize our scss files from any liquid 

Code for file: 
```
{% comment %}

:root {
--color-body-text: {{ settings.color_body_text }};
--color-background: {{ settings.color_background_color }}
}
{% endcomment %}

<style>
  :root {
    --color-black: #000000;
    --color-white: #ffffff;
  }
</style>
```

2. Add snippet `js-variables.liquid` to snippets folder
    - This file allow us to sanitize our javascript files from any liquid 

Code for file: 
```
{% capture js_variables %}
  <script>
  Shopify = window.Shopify || {};
  {% comment %} /* # Theme settings
  ================================================== */ {% endcomment %}
  Shopify.theme_settings = {};
  {% comment %} Example: {% endcomment %}
  {% comment %} Cart 
  Shopify.theme_settings.display_tos_checkbox = {{ settings.display_tos_checkbox | json }};
  Shopify.theme_settings.go_to_checkout = {{ settings.go_to_checkout | json }};
  Shopify.theme_settings.cart_action = {{ settings.cart_action | json }};
  {% endcomment %}
  </script>
{% endcapture %}

{%- assign js_variables = js_variables | split: 'Shopify.' -%}

{%- for variable in js_variables -%}
  {%- assign variableblock = variable | strip -%}
  {% if forloop.first %}
    {{ variableblock }}
  {% else %}
    {{ variableblock | prepend: 'Shopify.' }}
  {% endif %}
{%- endfor -%}
```

2. Add code for css and js variables to `theme.liquid` in the `head`.
```
 {% include 'css-variables' %}
```

```
 {% include 'js-variables' %}
```

3. Run npm install (or yarn install)
4. Make sure Shopify tooling is installed
- `brew tap shopify/shopify`
- `brew install themekit`
5. Install Gulp CLI
- `npm install gulp-cli -g`
6. Build minified files
- `npm run build`
7. Include minified files in `theme.liquid`
- `{{ 'main.min.css' | asset_url | stylesheet_tag }}`
- `{{ 'index.min.js' | asset_url | script_tag }}`
8. Add Store url to `cypress.json`
9. See Project's `README.md` for next steps in setting up the project
