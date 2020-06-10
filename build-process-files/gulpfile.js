// Gulp and Gulp Plugins
const gulp = require("gulp");
const fs = require("fs");
const t2 = require("through2");
const aliases = require("gulp-style-aliases");
const concat = require("gulp-concat");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const log = require("fancy-log");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify");
const rollup = require("gulp-rollup-lightweight");
const babel = require("rollup-plugin-babel");
const noderesolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

let cssPlugins = [autoprefixer(), cssnano()];

const directories = ["src/", "theme/"];

/**
 * Checks repo for directory setup if it is Slate-based or
 * one of the two other common options
 */
function repoDirectoryCheck() {
  let repoDirectory = "./";

  directories.forEach(directory => {
    try {
      fs.accessSync(directory, fs.constants.F_OK);
      repoDirectory = directory;
    } catch (error) {}
  });

  return repoDirectory;
}

const themeDirectory = repoDirectoryCheck();
const scriptsDirectory = themeDirectory + "scripts/";
const stylesDirectory = themeDirectory + "styles/";

const scriptsEntryFiles = fs.readdirSync(scriptsDirectory).filter(file => {
  if (file.indexOf(".") > -1) {
    return true;
  }
});

const stylesEntryFiles = fs.readdirSync(stylesDirectory).filter(file => {
  if (file.indexOf(".") > -1) {
    return true;
  }
});

const stylesBuildTask = fileName => {
  log("~~~~~~~~~~~~~~~~");
  log("Styles Compiling...");
  log("Compiling: " + fileName);

  return gulp
    .src(stylesDirectory + fileName)
    .pipe(sourcemaps.init())
    .pipe(
      aliases({
        "@vendor": "./node_modules/",
      })
    )
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(postcss(cssPlugins))
    .pipe(concat(fileName.replace(".scss", "") + ".min.css"))
    .pipe(gulp.dest(themeDirectory + "assets/"))
    .pipe(
      t2.obj((chunk, enc, callback) => {
        let date = new Date();
        chunk.stat.atime = date;
        chunk.stat.mtime = date;
        callback(null, chunk);
      })
    )
    .on("end", () => {
      log("+++++++++++++++");
      log(fileName + " built!");
    });
};

const jsBuildTask = function (fileName) {
  log("~~~~~~~~~~~~~~~~");
  log("JS Compiling...");
  log("Compiling: " + fileName);

  return rollup({
    input: scriptsDirectory + fileName,
    external: ["$", "jquery", "jQuery"],
    output: {
      globals: { jquery: "$", jQuery: "$", moment: "moment" },
      format: "umd",
      sourcemap: "inline",
    },
    plugins: [
      babel({ runtimeHelpers: true }),
      noderesolve({
        mainFields: ["module", "main"],
      }),
      commonjs(),
    ],
    onwarn: warning => {
      //   This avoids a weird issue with some of the rollup plugins just spamming warnings
      return true;
    },
  })
    .pipe(source(fileName.replace(".js", "") + ".min.js"))
    .pipe(buffer())
    .pipe(uglify({ mangle: { reserved: ["jQuery", "$"], keep_fnames: true } }))
    .pipe(gulp.dest(themeDirectory + "assets/"))
    .pipe(
      t2.obj((chunk, enc, callback) => {
        let date = new Date();
        chunk.stat.atime = date;
        chunk.stat.mtime = date;
        callback(null, chunk);
      })
    )
    .on("end", () => {
      log("~~~~~~~~~~~~~~~~");
      log(fileName + " built!");
    });
};

gulp.task("css", async function () {
  log("+++++++++++++++");
  log("CSS Compiling...");
  log("Compiling: main.scss");

  return gulp
    .src(stylesDirectory + "main.scss")
    .pipe(sourcemaps.init())
    .pipe(
      aliases({
        "@vendor": "./node_modules/",
      })
    )
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(postcss(cssPlugins))
    .pipe(concat("main.min.css"))
    .pipe(
      t2.obj((chunk, enc, callback) => {
        let date = new Date();
        chunk.stat.atime = date;
        chunk.stat.mtime = date;
        callback(null, chunk);
        log(chunk.stat.mtime);
      })
    )
    .pipe(gulp.dest(themeDirectory + "assets/"))
    .on("end", () => {
      log("+++++++++++++++");
      log("main.css built!");
    });
});

gulp.task("css-modules", async function () {
  return stylesEntryFiles.forEach(entryFile => {
    if (
      entryFile.includes(".css") ||
      (entryFile.includes(".scss") && entryFile !== "main.scss")
    ) {
      stylesBuildTask(entryFile);
    }
  });
});

gulp.task("javascript", async function () {
  return scriptsEntryFiles.forEach(entryFile => {
    if (entryFile.includes(".js")) {
      jsBuildTask(entryFile);
    }
  });
});

gulp.task("test", function () {
  console.log("test test test");
  return true;
});

gulp.task("build", gulp.parallel("css", "css-modules", "javascript"));

gulp.task("default", () => {
  gulp.watch(scriptsDirectory + "**/*.js", gulp.parallel("javascript"));
  gulp.watch("./styles/**/*.scss", gulp.parallel("css"));
  gulp.watch("./styles/**/*.scss", gulp.parallel("css-modules"));
});
