const Language = require('../classes/language');
const Syllable = require('../classes/syllable');
const defaultOptions = require('../classes/default');

const defaultElements = {
    onset: {
        type: ['consonants', 'affricates'],
        text: 'b'
    },
    nucleus: {
        type: ['vowels', 'low'],
        text: 'a'
    },
    coda: {
        type: ['consonants', 'approximants'],
        text: 'r'
    }
};

test('empty constructor for Language returns default options', () => {
    var CheckLang = new Language();

    expect(CheckLang.id).toBe('GIB');
});

describe('Language.Syllable()', () => {
    var lang = new Language();
    describe('without parameters', () => {
        var syl = lang.Syllable();

        it('returns a valid Syllable', () => {
            expect(syl).toBeInstanceOf(Syllable);
        });

        it('with defaultOptions', () => {
            expect(syl.options).toEqual(defaultOptions);
        });
    });

    describe('with parameters', () => {
        var syl = lang.Syllable(defaultElements);

        it('returns a valid Syllable', () => {
            expect(syl).toBeInstanceOf(Syllable);
        });

        it('with defaultOptions', () => {
            expect(syl.options).toEqual(defaultOptions);
        });

        it('with the requested elements', () => {
            expect(syl.toString()).toEqual('bar');
        });
    });
});

describe('Language.Word()', () => {
    var lang = new Language();
    describe('without parameters', () => {
        var word = lang.Word();

        it('returns a string', () => {
            expect(typeof word).toBe('string');
        });
    });
});

describe('Language.Sentence()', () => {
    var lang = new Language();
    describe('without parameters', () => {
        var sentence = lang.Sentence();

        it('returns a string', () => {
            expect(typeof sentence).toBe('string');
        });
    });
});

describe('Language.Text()', () => {
    var lang = new Language();
    describe('without parameters', () => {
        var txt = lang.Text();

        it('returns a string', () => {
            expect(typeof txt).toBe('string');
        });
    });
});