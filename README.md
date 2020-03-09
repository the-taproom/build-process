# Build Process

This build process aims to be an agnostic way to ensure modern features in our
Shopify projects. It is entirely opt in. This enables it to be dropped into an
existing theme but only affect new files created in the scripts/styles folders.
Any old assets wouldn't be converted to build process unless explicitly done so.
This also allows one to 'opt out' of the process during development if needed.
so at any point, a file can be moved back to `assets`, `theme.liquid` file
reference updated, and theme deployed to circumvent the build process.

## Overview

### Scripts and Styles folders

The root directory for these folders are iterated through on build. Each file
located in root will have an equitable `.min` file created for it in the assets
folder. This provides the opportunity to only load the scripts and styles
needed for a specific page instead of loading everything for the entire site at
one time. For the components that need to be on every page, you can do this by
creating a subdirectory in the `scripts` or `styles` folder and importing it to
a main file in the root of the parent directory (see Note).

The build process is possible because these are javascript, css, or scss files, 
not `.liquid` files. Liquid in the build process files will keep it from
working. If `.js.liquid`, `.css.liquid` or `.scss.liquid` files need to be moved
over, please follow [this process]() for sanitizing the files of liquid and
referencing them in a way the build process can handle.

_Note: There is an issue currently where changes to files in subdirectories will
not force a rebuild for files in the parent directory which might include
references to the child directory files. For now, the workarounds are to rebuild
each time or place the file in assets while in development and reference it
directly in theme, then move it back to build process as you prepare for
deployment._

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

1. Setup project (recommend (Skeleton Theme)[https://github.com/Shopify/skeleton-theme/tree/master/src/styles])
2. Copy files from `build-process-files` (script below) to the directory of your project
- `rsync -aP [PATH_TO_BUILD_PROCESS_DIR]/build-process-files/{.,}* [PATH_TO_PROJECT_DIR]`
3. Add `styles` folder (if needed)
4. Add `scripts` folder (if needed)


### Setup in Existing Project

1. Clone this repo
2. Copy files from `build-process-files` (script below) to the directory of your project
- `rsync -aP [PATH_TO_BUILD_PROCESS_DIR]/build-process-files/{.,}* [PATH_TO_PROJECT_DIR]`
3. Add `styles` folder
4. Add `scripts` folder

### Next Steps

1. Run npm install
2. Make sure Shopify tooling is installed
- `brew tap shopify/shopify`
- `brew install themekit`
3. Install Gulp CLI
- `npm install gulp-cli -g`
4. Setup `config.yml` (Snippet on Cacher)
5. Get password from private app
- New Client
  - Create a new Private app
- Previous Client
  - Shopify admin => Apps => Private Apps => Manage Private Apps => Taproom App
    => Password ([Themekit Walkthrough](https://shopify.github.io/themekit/#get-api-access))

6. Run `theme deploy`

