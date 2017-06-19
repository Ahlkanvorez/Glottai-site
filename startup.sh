#!/usr/bin/env bash

echo "Conglomerating files for distribution ..."
gulp js

echo "Compiling SCSS to CSS ..."
sass app/stylesheets/app.scss app/stylesheets/app.css

echo "Updating packages with yarn, and starting the server ..."
npm start
