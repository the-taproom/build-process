const open = require("open");
const yaml = require('js-yaml');
const fs = require('fs');

function buildUrl(env) {
  return `https://${env.store}?preview_theme_id=${env.theme_id}`;
}

function allOrNothing(data, fileContents) {
  if (!process.argv[2] || !data || !fileContents || typeof data === "object" && data.development === undefined) throw new Error("environment has to be specific");
}

function run() {
  try {
    const env = process.argv[2];
    const fileContents = fs.readFileSync("../config.yml", "utf8");
    const data = yaml.safeLoad(fileContents);
    allOrNothing();

    var url;
    switch (env) {
      case "development" || "dev":
        url = buildUrl(data.development);
        break;
      case "staging" || "stage":
        url = buildUrl(data.staging);
        break;
      case "production" || "prod":
        url = buildUrl(data.production);
        break;
    }
    console.log("Opening URL: " + url);
    open(url);
  } catch (e) {
    console.log("ERROR Opening Dev Store URL: " + JSON.stringify(e));
  }
}

run();