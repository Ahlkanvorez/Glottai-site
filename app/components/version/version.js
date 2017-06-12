'use strict';

angular.module('glottaiApp.version', [
  'glottaiApp.version.interpolate-filter',
  'glottaiApp.version.version-directive'
])

.value('version', '0.1');
