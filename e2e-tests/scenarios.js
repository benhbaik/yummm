'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('yummm', function() {

  it('should automatically redirect to / when location hash/fragment is empty', function() {
    browser.get('/');
    expect(browser.getLocationAbsUrl()).toMatch('/');
  });

  describe('login', function() {

      beforeEach(function() {
          browser.get('#!/login');
      });

      describe('successful login', function() {
          beforeEach(function () {
              var username = element(by.model('loginCtrl.credentials.username'));
              var password = element(by.model('loginCtrl.credentials.password'));
              var login = element(by.css('.login'));

              username.sendKeys('username');
              password.sendKeys('password');
              login.click();
          });

         it('sets token after login', function() {
             var token = browser.executeScript('window.localStorage.getItem("token")');
             expect(token).toBeDefined();
         });

         it('displays different nav links when logged in', function() {
             var loggedInMenu = element(by.css('.logged-in'));
             var loggedOutMenu = element(by.css('.logged-out'));

             expect(loggedOutMenu.isDisplayed()).toBe(false);
             expect(loggedInMenu.isDisplayed()).toBe(true);
         });
         // TODO this test is not valid, already at dashboard after login
         it('changes href of logo after login', function() {
             var logo = element(by.css('.logo a'));
             logo.click();

             expect(browser.getLocationAbsUrl()).toMatch('/dashboard')
         });
     });

     describe('incorrect login', function() {
         var username;
         var password;
         var login;
         var alert;

         beforeEach(function () {
             username = element(by.model('loginCtrl.credentials.username'));
             password = element(by.model('loginCtrl.credentials.password'));
             login = element(by.css('.login'));
             alert = element(by.css('.alert-danger'));
         });

         it('diplays error message if username is wrong', function() {
             username.sendKeys('incorrectUsername');
             password.sendKeys('password');
             login.click();

             expect(alert.getText()).toBe('Username is incorrect.');
         });

         it('displays error message if password is wrong', function() {
             username.sendKeys('username');
             password.sendKeys('incorrectPassword');
             login.click();

             expect(alert.getText()).toBe('Sorry, the password does not match.');
         });
     });
  });

  describe('signup', function() {

      beforeEach(function() {
          browser.get('#!/signup');
      });

      describe('successful sign up', function() {

          beforeEach(function () {
              var username = element(by.model('signupCtrl.credentials.username'));
              var password = element(by.model('signupCtrl.credentials.password'));
              var signup = element(by.css('.signup'));

              username.sendKeys('anotheruser');
              password.sendKeys('password');
              signup.click();
          });

         it('sets token after sign up', function() {
             var token = browser.executeScript('window.localStorage.getItem("token")');
             expect(token).toBeDefined();
         });
      });
  });
});
