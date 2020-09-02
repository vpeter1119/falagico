const random = require('../util/random');

test('[random.int] generates a random number between 0 and 2', () => {
    var nr = 2;
    expect(typeof (random.int(nr))).toEqual("number");
    expect(random.int(nr)).toBeGreaterThanOrEqual(0);
    expect(random.int(nr)).toBeLessThanOrEqual(nr);
    var nr2 = (3 - 1);
    expect(typeof (random.int(nr2))).toEqual("number");
    expect(random.int(nr2)).toBeGreaterThanOrEqual(0);
    expect(random.int(nr2)).toBeLessThanOrEqual(nr);
})

test('[random.pick] picks a random element from the array', () => {
    var array = ["Maedhros", "Maglor", "Celegorm", "Caranthir", "Curufin", "Amrod", "Amras"];
    expect(array.includes(random.pick(array))).toBe(true);
})