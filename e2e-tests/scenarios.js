'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

// TODO: Update E2E tests for the new views.

describe('Glottai App', function() {


  it('should automatically redirect to /learning when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/learning");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html/learning');
    });


    it('should render learning when user navigates to /learning', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('about', function() {

    beforeEach(function() {
      browser.get('index.html/about');
    });


    it('should render about when user navigates to /about', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
