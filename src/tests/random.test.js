const random = require('../util/random');

describe('random.int(2) and random.int(3-1) result', () => {
    const nr = 2;
    var nr2 = (3 - 1);
    var result1 = random.int(nr);
    var result2 = random.int(nr2);

    it('is a number', () => {
        expect(typeof (result1)).toEqual('number');
        expect(typeof (result2)).toEqual('number');
    });
    it('is greater than or equal to 0', () => {
        expect(result1).toBeGreaterThanOrEqual(0);
        expect(result2).toBeGreaterThanOrEqual(0);
    });
    it('is less than or equal to 2', () => {
        expect(result1).toBeLessThanOrEqual(nr);
        expect(result2).toBeLessThanOrEqual(nr);
    });
});

describe('random.pick(<array>)', () => {
    const array = ['Maedhros', 'Maglor', 'Celegorm', 'Caranthir', 'Curufin', 'Amrod', 'Amras'];

    it('picks a random element from <array>', () => {
        expect(array.includes(random.pick(array))).toBe(true);
    });
});
