describe('search table filter', function () {
    'use strict';

    var $filter;

    beforeEach(function () {
        module('app');

        inject(function (_$filter_) {
            $filter = _$filter_;
        });
    });

    it('should return only relevent results', function () {

        var items = [{firstName:'abc', lastName:'def'},{firstName:'axx', lastName:'def'},{firstName:'sss', lastName:'awe'},{firstName:'xxx', lastName:'def'}];
        // Act.
        var result = $filter('searchTable')(items, {query:'a'});

        // Assert.
        expect(result.length).toEqual(3);
    });
});