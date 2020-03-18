# {ProjectName}

[Project Name](link to project Basecamp)

Master branch = `master`

To build this project:

1. Clone repo locally

2. Install Shopify tooling:
   **Using Homebrew**

   - `brew tap shopify/shopify`
   - `brew install themekit`

3. Install [Themekit](https://shopify.github.io/themekit/)

4. Run `npm install`

5. Set up config.yml (Snippet on Cacher)

6. Get password from private app

- **New Client**
  - Create a new Private app

- **Previous Client**
  - Shopify admin => Apps => Private Apps => Manage Private Apps => Taproom App 
    => Password ([Themekit Walkthrough](https://shopify.github.io/themekit/#get-api-access))

5. Run `theme deploy`

## Cypress

[Cypress](https://www.cypress.io/) allows for a complete end-to-end testing experience and provides
in-browser testing. This allows us to accuarately test Shopify stores from both
the live url and with preview links added

To get started with cypress, check out [their get started guide.](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html#Step-2-Query-for-an-element)

Live url for project is set up as an environment variable in the `cypress.json`
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

3. Start any new file with this inside the describe block:

``` javascript
let url = Cypress.env("url");
let devQuery = "";

if(Cypress.env("is-dev") == false) {
  devQuery = Cypress.env("dev-query");
}
```

4. When visiting in spec file, url can be referenced as:

``` javascript
cy.visit(`${url}${devQuery}`);
```

(See `cypress/integration/home-page.spec.js` for an example of use case)

5. To remove the preview query param from being appended to the url, change `is-dev` to `false` in `cypress.env.json`.
