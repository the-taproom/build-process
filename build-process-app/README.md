# Build Process

## Setup in New Project


## Setup in Existing Project

1. Clone this repo
2. Copy files in root (not including README) to the directory of your project
- `rsync -aP [PATH_TO_BUILD_PROCESS_DIR]/{.,}* [PATH_TO_PROJECT_DIR]`
3. Add `styles` folder
4. Add `scripts` folder

## Next Steps

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

