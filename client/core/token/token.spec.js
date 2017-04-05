'use strict';

describe('token', function() {

    it('should be defined', function() {
        var tokenModule = angular.module('core.token');
        expect(tokenModule).toBeDefined();
    });

    beforeEach(module('core.token'));

    describe('token.service', function() {
        var Token;
        var token;

        beforeEach(inject(function(_Token_) {
            var args = arguments;
            token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
                    'eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiX2lkI' +
                    'joiNThkYWQ4ZDBhNmE5NDJlMjMxOWNlZGFiIi' +
                    'wiaWF0IjoxNDkxMDg2OTQxLCJleHAiOjE0OTE' +
                    'xMzAxNDF9.KfSP82jEgbpkpb4SPFyPaY3iiEH' +
                    '6bwMmisgVjLgRkTU';
            Token = _Token_;
        }));

        it('sets a token in local storage', function() {
            var storage = window.localStorage;

            Token.set(token);

            expect(storage.getItem('token')).toBe(token);
        });

        it('fetches token from local storage', function() {
            var setToken = Token.get();

            Token.set(token);

            expect(setToken).toBe(token);
        });

        it('removes token from localStorage', function() {
            var storage = window.localStorage;

            Token.set(token);
            Token.remove();

            expect(storage.getItem('token')).toBe(null);
        });
    });
});
