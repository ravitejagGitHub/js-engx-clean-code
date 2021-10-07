const assert = require('assert');

const SitePage = require('./SitePage');

describe('SitePage', () => {
    describe('getEditablePageUrl', () => {
        it('should generate URL with empty params', () => {
            const expected = 'http://mysite.com/?edit=true&siteGrp=default&userGrp=admin';
            const url = (new SitePage('default', 'admin')).getEditablePageUrl(new Map());

            assert.strictEqual(url, expected);
        });

        it('should generate URL with non-empty params', () => {
            const expected = 'http://mysite.com/?edit=true&id=1234&user=Alex&redirect=true&siteGrp=mySite&userGrp=std';
            const url = (new SitePage('mySite', 'std')).getEditablePageUrl(new Map([
                ['id', '1234'],
                ['user', 'Alex'],
                ['redirect', 'true'],
            ]));

            assert.strictEqual(url, expected);
        });
    });
});
