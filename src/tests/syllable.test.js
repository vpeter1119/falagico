const Syllable = require('../classes/syllable');
const defaultOptions = require('../classes/default');
const random = require('../util/random');

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

describe('Syllable() with empty constructor', () => {
    var syl = new Syllable();

    it('returns a valid Syllable instance', () => {
        expect(typeof syl).toBe('object');
        expect(syl).toHaveProperty('onset');
        expect(syl).toHaveProperty('nucleus');
        expect(syl).toHaveProperty('coda');
    });

    it('configures Syllable with defaultOptions', () => {
        expect(syl.options).toEqual(defaultOptions);
    });
});

describe('Syllable(elements) with valid parameters', () => {
    var options = defaultOptions;
    var elements = defaultElements;
    var syl = new Syllable(options, elements);

    it('returns a valid Syllable instance', () => {
        expect(typeof syl).toBe('object');
        expect(syl).toHaveProperty('onset');
        expect(syl).toHaveProperty('nucleus');
        expect(syl).toHaveProperty('coda');
    });

    it('returns the specified elements', () => {
        expect(syl.onset.text).toBe(elements.onset.text);
        expect(syl.nucleus.text).toBe(elements.nucleus.text);
        expect(syl.coda.text).toBe(elements.coda.text);
    });
});

describe('generator methods return valid elements', () => {
    var options = defaultOptions;
    var syl = new Syllable();

    describe('GenerateOnset()', () => {
        var onset = syl.GenerateOnset();
        var validOnsetTypes = options.phonology.phonotactics.onsets;

        it('returns a valid element', () => {
            expect(typeof onset).toBe('object');
            expect(onset).toHaveProperty('type');
        });
        test('which adheres to the specified ruleset', () => {
            expect(validOnsetTypes.includes(onset.type)).toBe(true);
        });
    });

    describe('GenerateOnset(type) with valid type', () => {
        var validOnsetTypes = options.phonology.phonotactics.onsets;
        var type = random.pick(validOnsetTypes);
        var onset = syl.GenerateOnset(type);

        it('returns a valid element', () => {
            expect(typeof onset).toBe('object');
            expect(onset).toHaveProperty('type');
        });
        test('which adheres to the specified ruleset', () => {
            expect(validOnsetTypes.includes(onset.type)).toBe(true);
        });
        it('and has the specified type', () => {
            expect(onset.type).toBe(type);
        });
    });

    describe('GenerateOnset(type) with invalid type', () => {
        var validOnsetTypes = options.phonology.phonotactics.onsets;
        var type = ['thisIsNot','aValidType'];
        var onset = syl.GenerateOnset(type);

        it('returns a valid element', () => {
            expect(typeof onset).toBe('object');
            expect(onset).toHaveProperty('type');
        });
        test('which adheres to the specified ruleset', () => {
            expect(validOnsetTypes.includes(onset.type)).toBe(true);
        });
    });

    describe('GenerateNucleus()', () => {
        var nucleus = syl.GenerateNucleus();
        var validNucleusTypes = options.phonology.phonotactics.nuclei;

        it('returns a valid element', () => {
            expect(typeof nucleus).toBe('object');
            expect(nucleus).toHaveProperty('type');
        });
        test('which adheres to the specified ruleset', () => {
            expect(validNucleusTypes.includes(nucleus.type)).toBe(true);
        });
    });

    describe('GenerateNucleus(type) with valid type', () => {
        var validNucleusTypes = options.phonology.phonotactics.nuclei;
        var type = random.pick(validNucleusTypes);
        var nucleus = syl.GenerateNucleus(type);

        it('returns a valid element', () => {
            expect(typeof nucleus).toBe('object');
            expect(nucleus).toHaveProperty('type');
        });
        test('which adheres to the specified ruleset', () => {
            expect(validNucleusTypes.includes(nucleus.type)).toBe(true);
        });
        it('and has the specified type', () => {
            expect(nucleus.type).toBe(type);
        });
    });

    describe('GenerateNucleus(type) with invalid type', () => {
        var validNucleusTypes = options.phonology.phonotactics.nuclei;
        var type = ['thisIsNot', 'aValidType'];
        var nucleus = syl.GenerateNucleus(type);

        it('returns a valid element', () => {
            expect(typeof nucleus).toBe('object');
            expect(nucleus).toHaveProperty('type');
        });
        test('which adheres to the specified ruleset', () => {
            expect(validNucleusTypes.includes(nucleus.type)).toBe(true);
        });
    });

    describe('GenerateCoda()', () => {
        var coda = syl.GenerateCoda();
        var validCodaTypes = options.phonology.phonotactics.codas;

        it('returns a valid element', () => {
            expect(typeof coda).toBe('object');
            expect(coda).toHaveProperty('type');
        });
        test('which adheres to the specified ruleset', () => {
            expect(validCodaTypes.includes(coda.type)).toBe(true);
        });
    });

    describe('GenerateCoda(type) with valid type', () => {
        var validCodaTypes = options.phonology.phonotactics.codas;
        var type = random.pick(validCodaTypes);
        var coda = syl.GenerateCoda(type);

        it('returns a valid element', () => {
            expect(typeof coda).toBe('object');
            expect(coda).toHaveProperty('type');
        });
        test('which adheres to the specified ruleset', () => {
            expect(validCodaTypes.includes(coda.type)).toBe(true);
        });
        it('and has the specified type', () => {
            expect(coda.type).toBe(type);
        });
    });

    describe('GenerateCoda(type) with invalid type', () => {
        var validCodaTypes = options.phonology.phonotactics.codas;
        var type = ['thisIsNot', 'aValidType'];
        var coda = syl.GenerateCoda(type);

        it('returns a valid element', () => {
            expect(typeof coda).toBe('object');
            expect(coda).toHaveProperty('type');
        });
        test('which adheres to the specified ruleset', () => {
            expect(validCodaTypes.includes(coda.type)).toBe(true);
        });
    });
});

describe('ChangeElementType() without parameters', () => {
    var syl = new Syllable();

    it('throws a SyntaxError', () => {
        expect(() => { syl.ChangeElementType(); }).toThrow(SyntaxError);
    });

});

describe('ChangeElementType(element) with a valid elementType', () => {
    var syl = new Syllable();
    var element = 'nucleus';
    var oldElement = syl[element];

    it('changes type of the specified element', () => {
        syl.ChangeElementType(element);
        var newElement = syl[element];
        expect(newElement.type).not.toBe(oldElement.type);
    });
});

describe('ChangeElementType(element) with an invalid elementType', () => {
    var syl = new Syllable();
    var elementType = 'thisIsNotAValidType';

    it('throws a TypeError', () => {
        expect(() => { syl.ChangeElementType(elementType); }).toThrow(TypeError);
    });

});

describe('Regen()', () => {
    var syl = new Syllable();
    var elementType = 'thisIsNotAValidType';

    it('throws a TypeError', () => {
        expect(() => { syl.ChangeElementType(elementType); }).toThrow(TypeError);
    });

});

describe('Syllable.toString()', () => {
    var elements = defaultElements;
    var syl = new Syllable(defaultOptions, elements);
    var str = syl.toString();

    it('returns a string', () => {
        expect(typeof str).toBe('string');
    });

    it('matches the requested elements', () => {
        expect(str).toBe(`${elements.onset.text}${elements.nucleus.text}${elements.coda.text}`);
    });

});

describe('Syllable.toArray()', () => {
    var elements = defaultElements;
    var syl = new Syllable(defaultOptions, elements);
    var str = syl.toArray();

    it('returns an array of strings', () => {
        expect(str.length).toBe(3);
    });

    it('matches the requested elements', () => {
        expect(str[0]).toBe('b');
        expect(str[1]).toBe('a');
        expect(str[2]).toBe('r');
    });

});