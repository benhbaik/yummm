'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('yummm', function() {

  it('should automatically redirect to / when location hash/fragment is empty', function() {
    browser.get('/');
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });

  beforeEach(function() {
      browser.get('#!/login');
  });

  describe('login', function() {
     it('should set token after login', function() {
         var username = element(by.model('loginCtrl.username'));
         var password = element(by.model('loginCtrl.password'));
         var login = element(by.css('.login'));
         var token = browser.executeScript('window.localStorage.getItem("token")');

         username.sendKeys('username');
         password.sendKeys('password');
         login.click();

         expect(token).toBeDefined();
     });
  });


});
