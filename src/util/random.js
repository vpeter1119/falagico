
// Generate random int
function GetRandomInt(max) {
    const int = Math.floor(Math.random() * Math.floor(max));
    return int;
}

// Pick random element from array
function PickRandom(array) {
    const index = Math.floor(Math.random() * Math.floor(array.length));
    return array[index];
}

module.exports = {
    int: GetRandomInt,
    pick: PickRandom
}