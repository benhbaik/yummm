'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */
var protractor = require('protractor');

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

      // Cannot run this test every time due to multiple db entries
      // until delete is implemented

    //   describe('successful sign up', function() {
    //       beforeEach(function () {
    //           var username = element(by.model('signupCtrl.credentials.username'));
    //           var password = element(by.model('signupCtrl.credentials.password'));
    //           var signup = element(by.css('.signup'));
    //           username.sendKeys('anotheruser');
    //           password.sendKeys('password');
    //           signup.click();
    //       });
    //      it('sets token after sign up', function() {
    //          var token = browser.executeScript('window.localStorage.getItem("token")');
    //          expect(token).toBeDefined();
    //      });
    //   });

        describe('unsuccessful signup', function() {
            var username;
            var password;
            var signup;
            var alert;

            beforeEach(function () {
                username = element(by.model('signupCtrl.credentials.username'));
                password = element(by.model('signupCtrl.credentials.password'));
                signup = element(by.css('.signup'));
                alert = element(by.css('.alert-danger'));
            });

            it('displays error if username is too long', function() {
                username.sendKeys('thisusernameiswaytoolong');
                password.sendKeys('password');
                signup.click();

                expect(alert.getText()).toBe('Please enter a valid username.');
            });

            it('displays error if username is too short', function() {
                username.sendKeys('ace');
                password.sendKeys('password');
                signup.click();

                expect(alert.getText()).toBe('Please enter a valid username.');
            });

            it('display error if password is too long', function() {
                username.sendKeys('username');
                password.sendKeys('thispasswordiswaytoolong');
                signup.click();

                expect(alert.getText()).toBe('Please enter a valid password.');
            });

            it('displays error if password is too short', function() {
                username.sendKeys('username');
                password.sendKeys('ace');
                signup.click();

                expect(alert.getText()).toBe('Please enter a valid password.');
            });
        });
    });

    describe('search', function() {
        beforeEach(function() {
            browser.get('#!/search');
        });

        it('displays search results', function() {
            var query = element(by.model('searchCtrl.query'));
            var submit = element(by.css('[ng-click="searchCtrl.search(searchCtrl.query)"]'));

            query.sendKeys('chicken');
            submit.click();

            element.all(by.repeater('result in searchCtrl.results')).then(function(results) {
                expect(results.length).toBe(10);
            });
        });
    });
});
