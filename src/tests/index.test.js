const main = require('../index.js');

describe('exported languages', () => {
    const defaultLanguages = main.languages;
    const expectedLanguages = ['TestLang', 'Elvish'];

    test.each(expectedLanguages)(`includes %s`, (lang) => {
        expect(defaultLanguages).toHaveProperty(lang);
    })
})