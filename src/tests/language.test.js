const Language = require('../classes/language');
const Syllable = require('../classes/syllable');
const defaultOptions = require('../classes/default');
const languages = require('../languages/defaults');

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

    describe('for Elvish', () => {
        var Elvish = languages.Elvish;
        var elvishSyl = Elvish.Syllable();

        it('returns correct type', () => {
            expect(elvishSyl).toBeInstanceOf(Syllable);
        });

        it('correct options', () => {
            expect(elvishSyl.options).toBe(Elvish.options);
        });
    });

    describe('uses the correct adjustType', () => {
        it('with default settings', () => {
            var syl = new Language().Syllable();
            expect(syl.pow).toEqual(defaultOptions.config.adjustTypes);
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

describe('constraints work', () => {
    var lang = new Language();

    test('liquid onsets after coda prevented', () => {
        var syl1 = lang.Syllable(
            {
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
            },
        );
        var syl2 = lang.Syllable(
            {
                onset: {
                    type: ['consonants', 'liquids'],
                    text: 'gr'
                },
                nucleus: {
                    type: ['vowels', 'high'],
                    text: 'i'
                },
                coda: {
                    type: ['consonants', 'nasals'],
                    text: 'm'
                }
            });
        var word = [syl1, syl2];
        var newWord = lang.CheckLiquid(word);
        expect(newWord[1].onset.type).not.toBe(['consonants', 'liquids']);
    });

    test('glide onsets after coda prevented', () => {
        var syl1 = lang.Syllable(
            {
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
            },
        );
        var syl2 = lang.Syllable(
            {
                onset: {
                    type: ['consonants', 'glides'],
                    text: 'hw'
                },
                nucleus: {
                    type: ['vowels', 'high'],
                    text: 'i'
                },
                coda: {
                    type: ['consonants', 'nasals'],
                    text: 'm'
                }
            });
        var word = [syl1, syl2];
        var newWord = lang.CheckGlide(word);
        expect(newWord[1].onset.type).not.toBe(['consonants', 'glides']);
    });

    test('empty onset after empty coda prevented', () => {
        var syl1 = lang.Syllable(
            {
                onset: {
                    type: ['consonants', 'liquids'],
                    text: 'dl'
                },
                nucleus: {
                    type: ['vowels', 'low'],
                    text: 'a'
                },
                coda: {
                    type: ['consonants','nasals'],
                    text: 'm'
                }
            },
        );
        var syl2 = lang.Syllable(
            {
                onset: {
                    type: [],
                    text: ''
                },
                nucleus: {
                    type: ['vowels', 'low'],
                    text: 'a'
                },
                coda: {
                    type: [],
                    text: ''
                }
            }
        );
        var syl3 = lang.Syllable(
            {
                onset: {
                    type: [],
                    text: ''
                },
                nucleus: {
                    type: ['vowels', 'low'],
                    text: 'a'
                },
                coda: {
                    type: [],
                    text: ''
                }
            }
        );
        var word = [syl1, syl2, syl3];
        var newWord = lang.CheckDoubleNucleus(word);
        expect(newWord[2].onset.type).not.toBe([]);
    });
});