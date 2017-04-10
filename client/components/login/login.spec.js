// 'use strict';

// describe('login', function() {
//     beforeEach(function() {
//         module('login');
//         module('core.auth', function($provide) {
//             $provide.factory('Auth', function() {
//                 return {
//                     login: function(userInfo, vm, location) {
//                         vm.success = false;

//                         if (userInfo.username === 'incorrectUsername') {
//                             vm.errorMessage = 'Username is incorrect.';
//                         }

//                         if (userInfo.password === 'incorrectPassword') {
//                             vm.errorMessage = 'Sorry, the password does not match.';
//                         }
//                     }
//                 };
//             });
//         });
//     });

//     it('should be defined', function() {
//         var loginModule = angular.module('login');

//         expect(loginModule).toBeDefined();
//     });

//     describe('login controller', function() {
//         var location;
//         var ctrl;

//         beforeEach(inject(function($componentController, $location) {
//             location = $location;
//             ctrl = $componentController('login');
//         }));

//         it('display error when username is incorrect', function() {
//             var user = {
//                 username: 'incorrectUsername',
//                 password: 'password'
//             };
//             ctrl.login(user, ctrl, location);
//             expect(ctrl.errorMessage).toBe('Username is incorrect.');
//         });

//         it('display error when password is incorrect', function() {
//             var user = {
//                 username: 'username',
//                 password: 'incorrectPassword'
//             };
//             ctrl.login(user, ctrl, location);
//             expect(ctrl.errorMessage).toBe('Sorry, the password does not match.');
//         });
//     });
// });
