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
            var storage = window.localStorage;

            Token.set(token);

            expect(storage.getItem('token')).toBe(token);
        });

        it('fetches token from local storage', function() {
            var token = '24#@fsdh32DSA1G3yfsd14432';
            var setToken = Token.get();

            Token.set(token);

            expect(setToken).toBe(token);
        });

        it('removes token from localStorage', function() {
            var token = '24#@fsdh32DSA1G3yfsd14432';
            var storage = window.localStorage;

            Token.set(token);
            Token.remove();

            expect(storage.getItem('token')).toBe(null);
        });
    });
});
