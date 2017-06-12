'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Glottai App', function() {


  it('should automatically redirect to /learningView when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/learningView");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html/learningView');
    });


    it('should render learningView when user navigates to /learningView', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
