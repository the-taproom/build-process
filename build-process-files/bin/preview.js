const open = require("open");
const yaml = require('js-yaml');
const fs = require('fs');

/**
 * @param {Config} env
 */
function buildUrl(env) {
  return `https://${env.store}?preview_theme_id=${env.theme_id}`;
}

/**
 * @typedef {object} Config
 * @property {string} store
 * @property {number} theme_id
 * @param {string} env development|staging|production
 * @param {Config} data
 * @param {object} fileContents
 */
function allOrNothing(env, data, fileContents) {
  if (!env || !data || !fileContents) throw new Error("environment has to be specific");
}

function run() {
  try {
    const env = process.argv[2];
    const fileContents = fs.readFileSync("./config.yml", "utf8");
    const data = yaml.safeLoad(fileContents);
    allOrNothing(env, data, fileContents);
    let url;

    switch (env) {
      case "development":
        url = buildUrl(data.development);
        console.log(url);
        break;
      case "staging":
        url = buildUrl(data.staging);
        break;
      case "production":
        url = buildUrl(data.production);
        break;
    }

    console.log("Opening URL: " + url);
    open(url);
  } catch (e) {
    console.info(`ERROR: Could not Open shopify store preview URL.`);
    console.error(e);
  }
}

run();