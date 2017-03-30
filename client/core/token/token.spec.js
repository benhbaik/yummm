'use strict';

describe('token', function() {
    var Token;

    beforeEach(module('core.token'));

    it('should be defined', function() {
        var tokenModule = angular.module('core.token');
        expect(tokenModule).toBeDefined();
    });

    describe('token.service', function() {

        beforeEach(inject(function(_Token_) {
            var args = arguments;
            Token = _Token_;
        }));

        it('sets a token in local storage', function() {
            var token = '24#@fsdh32DSA1G3yfsd14432';
            Token.set(token);
            var setToken = window.localStorage.getItem('token');

            expect(setToken).toBe(token);
        });

        it('fetches token from local storage', function() {
            var token = '24#@fsdh32DSA1G3yfsd14432';
            Token.set(token);
            var setToken = Token.get();

            expect(setToken).toBe(token);
        });

        it('removes token from localStorage', function() {
            var token = '24#@fsdh32DSA1G3yfsd14432';
            Token.set(token);
            Token.remove();

            var removedToken = Token.get();
            expect(removedToken).toBe(null);
        });
    });
});
