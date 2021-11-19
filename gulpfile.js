"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

const dist = "./dist/";
// const dist = "E:/OpenServer/domains/localhost/test";  //??? для швикого тесту проекту на локальному сервері, можна створити в ньому папку і прописати шлях в дану змінну

//? копіюємо html файл в dist
gulp.task("copy-html", () => {
  return gulp.src("./src/index.html")
    .pipe(gulp.dest(dist))
    .pipe(browsersync.stream());
});

gulp.task("build-js", () => { //! збірка gulp + webpack для налаштування js
    return gulp.src("./src/js/main.js")
      .pipe(webpack({
          mode: 'development', //! мод для швидкої роботи із скриптами
          output: {
              filename: 'script.js'//! файл в який будуть збиратить результати
          },
          watch: false,
          devtool: "source-map",
          module: {
              rules: [
                {
                  test: /\.m?js$/,
                  exclude: /(node_modules|bower_components)/,
                  use: {
                    loader: 'babel-loader',
                    options: {
                      presets: [['@babel/preset-env', {
                          debug: true,//! консоль вкаже місце помилки
                          corejs: 3,//! налаштування бібліотеки з поліфілами для проекту
                          useBuiltIns: "usage"
                      }]]
                    }
                  }
                }
              ]
            }
      }))
      .pipe(gulp.dest(dist))
      .on("end", browsersync.reload);
});

//? перенесемо всі файли в усіх папках деректорії assets
gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")
      .pipe(gulp.dest(dist + "/assets"))
      .on("end", browsersync.reload);
});

//! таск для спостереження за файлами
gulp.task("watch", () => {
    browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });

    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

//! запускаємо білд для усіх команд вище
gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));


//! запуск білда для продакшина
gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
      .pipe(webpack({
          mode: 'production',
          output: {
              filename: 'script.js'
          },
          module: {
              rules: [
                {
                  test: /\.m?js$/,
                  exclude: /(node_modules|bower_components)/,
                  use: {
                    loader: 'babel-loader',
                    options: {
                      presets: [['@babel/preset-env', {
                          corejs: 3,
                          useBuiltIns: "usage"
                      }]]
                    }
                  }
                }
              ]
            }
      }))
      .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));