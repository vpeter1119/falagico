const main = require('../index.js');

describe('exported languages', () => {
    const defaultLanguages = main.languages;
    const expectedLanguages = ['TestLang', 'Elvish'];

    test.each(expectedLanguages)('include %s', (lang) => {
        expect(defaultLanguages).toHaveProperty(lang);
    });
});

describe('info() returns the correct message', () => {

    it('[syntaxError] if language is not specified', () => {
        var result = main.info();
        expect(result).toBe(main.messages.errors.syntaxError);
    });

    it('[langNotFound] if language is not found', () => {
        var result = main.info('this_language_does_not_exist');
        expect(result).toBe(main.messages.errors.langNotFound);
    });
});