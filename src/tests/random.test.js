const random = require('../util/random');

describe('random.int(2) and random.int(3-1)', () => {
    const nr = 2;
    var nr2 = (3 - 1);

    it('generates a random number between 0 and 2', () => {
        expect(typeof (random.int(nr))).toEqual('number');
        expect(random.int(nr)).toBeGreaterThanOrEqual(0);
        expect(random.int(nr)).toBeLessThanOrEqual(nr);
        expect(typeof (random.int(nr2))).toEqual('number');
        expect(random.int(nr2)).toBeGreaterThanOrEqual(0);
        expect(random.int(nr2)).toBeLessThanOrEqual(nr);
    });
});

describe('random.pick(<array>)', () => {
    const array = ['Maedhros', 'Maglor', 'Celegorm', 'Caranthir', 'Curufin', 'Amrod', 'Amras'];

    it('picks a random element from <array>', () => {
        expect(array.includes(random.pick(array))).toBe(true);
    });
});
