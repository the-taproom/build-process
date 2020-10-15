# {ProjectName}

[Project Name](link to project basecamp/management system)

Default branch = `main`

## Commands

* `npm run start`        - Builds assets then starts Gulp watcher on `scripts` and `styles` directories.
* `npm run build`        - Gulp builds the .min files from `scripts` and `styles`, but doesn't watch.
* `npm run watch`        - Runs theme deploy and theme watch on development config and opens the development preview link in your default browser.
* `npm run test`         - Runs Cypress open and will start any tests.
* `npm run deploy-dev`   - `theme deploy --env=development`
* `npm run deploy-stage` - `theme deploy --env=staging`
* `npm run preview` - Opens the development preview link in your default browser
* `npm run preview-staging` - Opens the staging preview link in your default browser
* `npm run preview-production` - Opens the production preview link in your default browser

## Project Setup

To build this project:

1. Clone repo locally

2. Install Shopify tooling:
   **Using Homebrew**

   - `brew tap shopify/shopify`
   - `brew install themekit`

   **Using Chocolatey**

   - `choco install themekit`

For more installation options, view the [Themekit](https://shopify.github.io/themekit/) documentation.

4. Run `npm install`

5. Set up config.yml

``` yaml
# password, theme_id, and store variables are required.
#
# For more information on this config file:
# https://shopify.github.io/themekit/commands/#configure

development:
  password: [your-api-password]
  theme_id: "[your-theme-id]"
  store: [your-store].myshopify.com
  ignores:
    -themekit.ignores
  ignore_files:
      - config/settings_data.json
      - config/settings_schema.json

staging:
  password: [your-api-password]
  theme_id: "[your-theme-id]"
  store: [your-store].myshopify.com
  ignores:
    -themekit.ignores
  ignore_files:
      - config/settings_data.json
      - config/settings_schema.json

production:
  password: [your-api-password]
  theme_id: "[your-theme-id]"
  store: [your-store].myshopify.com
  timeout: 100s
  readonly: true

```

6. Get password from a private app (All developers at The Taproom use the same app per client)

- **New Client**
  - Shopify admin => Apps => Private Apps => Manage Private Apps => Create New
    Private App
    - Enter App Name (e.g. Taproom Development) and Contact Email (e.g. dev@thetaproom.com) 
    - _Theme templates and theme assets_ set to **Read Write** access.
    - Save
    - Copy **Password**

    See gif below for walkthrough

- **Previous Client**
  - Shopify admin => Apps => Private Apps => Manage Private Apps => App Name (e.g. Taproom Theme Development)
    => Password

    Gif for walkthrough:
    ![Custom App Walkthrough](../setup-docs/shopify-local-theme-development-generate-api.gif)

7. Run `theme deploy`

***NOTE:** There is already an empty example config file (config-example.yml) in the directory for you to use as a starting point. For more information on configuration refer to the [ThemeKit configuration docs](https://shopify.github.io/themekit/commands/#configure)*.

## Cypress

[Cypress](https://www.cypress.io/) allows for a complete end-to-end testing experience and provides
in-browser testing. This allows us to accurately test Shopify stores from both
the live url and with preview links added.

To get started with Cypress, check out [their get started guide.](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Step-2-Query-for-an-element)

It is also recommended to checkout Cypress' [Best Practices guide](https://docs.cypress.io/guides/references/best-practices.html).

Live url for project is set as an environment variable in the `cypress.json`
file already. This will be the default url that is loaded.

### Cypress Dev Setup

If you would like to test themes that aren't live, follow these steps.

1. Add `cypress.env.json` file to the project root.

2. In `cypress.env.json` add the following code:

``` json
{
  "dev-query": "?preview_theme_id=81099980896",
  "is-dev": "true"
}
```

_Note: Change out theme id to your preview theme id_

3. Start any new file with this inside the `describe` block:

``` javascript
let url = Cypress.env("url");
let devQuery = "";

if(Cypress.env("is-dev") == "true") {
  devQuery = Cypress.env("dev-query");
}
```

4. When visiting in `spec` file, url can be referenced as:

``` javascript
cy.visit(`${url}${devQuery}`);
```

5. To remove the preview query param from being appended to the url, change `is-dev` to `false` in `cypress.env.json`.
