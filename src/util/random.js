/**
 * A utility module to generate randomness.
 * @module random
 * @author Peter Vertesi <info@petervertesi.com>
 * @copyright Peter Vertesi, 2020
 */

/**
 * Generates random integer.
 * @name int
 * @param {number} max Maximum value.
 * @returns {number} Random integer between 0 and {@linkcode max}.
 */
function GetRandomInt(max) {
    const int = Math.floor(Math.random() * Math.floor(max));
    return int;
}

/**
 * Pick a random element from an array.
 * @name pick
 * @param {any[]} array The array to pick from.
 * @returns {any} The random element.
 */
function PickRandom(array) {
    const index = Math.floor(Math.random() * Math.floor(array.length));
    return array[index];
}

module.exports = {
    int: GetRandomInt,
    pick: PickRandom
};