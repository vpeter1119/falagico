const Language = require('../classes/language');

test('empty constructor for Language returns default options', () => {
    var CheckLang = new Language();

    expect(CheckLang.id).toBe('GIB');
});