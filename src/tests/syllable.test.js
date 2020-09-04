const Syllable = require('../classes/syllable');
const defaultOptions = require('../classes/default');

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
    var elements = {
        onset: {
            type: ['consonants','affricates'],
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
    var syl = new Syllable(options);

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
});