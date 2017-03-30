'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('yummm', function() {

  it('should automatically redirect to / when location hash/fragment is empty', function() {
    browser.get('/');
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });

  // TODO write test for login

});
