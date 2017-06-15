#!/usr/bin/env bash

echo "Conglomerating files for distribution ..."
gulp js

echo "Updating packages with yarn, and starting the server ..."
npm start
