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