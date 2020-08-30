// Require modules
const _ = require("lodash");

// Config
const defaultOptions = {
    syllables: {
        inventory: {
            C: ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"],
            V: ["a", "e", "i", "o", "u"]
        },
        combinations: ["CVC"]
    },
    names: {
        firstNames: ["CVC"]
    }
}
const elvishOptions = {
    syllables: {
        inventory: {
            A: ["l", "w"],
            C: ["b", "c", "ch", "d", "dh", "f", "g", "l", "m", "n", "p", "r", "s", "t", "th", "v"],
            D: ["ya", "ye", "yo", "yu"],
            F: ["d", "dh", "n", "nn", "ch", "l", "g", "r", "s"],
            S: ["f", "v", "th", "s"],
            V: ["a", "e", "i", "o", "u", "y", "ae", "oe"]
        },
        combinations: ["CV", "SV", "CAV", "SAV", "SVF", "SAVF", "CAVF", "CVF", "VF", "SDF", "SADF", "CADF", "CDF", "DF"],
    },
    names: {
        firstNames: ["SVFV","SVAV","CVFV","CVAV","SVFVFV","SVAVFV","CVFVFV","CVAVFV","SVFVF","SVAVF","CVFVF","CVAVF"]
    }
}

// Messages
const messages = {
    hello: `Hello world!`
}

/* FUNCTIONS */

// Say hello (test)
function SayHello(name) {
    console.log(`Hello ${name}!`);
}

// Return syllable
function RandomSyllable(syllableStructure = "CVC", langOptions = defaultOptions, callback) {
    var options = !langOptions.syllables ? defaultOptions : langOptions;
    var structure = syllableStructure != "" ? syllableStructure : PickRandom(options.syllables.combinations);
    var syllable = [];
    var sylElList = structure.split('');
    new Promise((resolve, reject) => {
        sylElList.forEach(syllableElement => {
            var index = GetRandomInt(options.syllables.inventory[syllableElement].length);
            var character = options.syllables.inventory[syllableElement][index];
            syllable = syllable.concat(character);
            if (syllable.length == structure.length) {
                resolve();
            };
        });
    }).then(() => {
        callback (syllable.join(''));
    });
}

// Get random word
function RandomWord(length = 2, options = defaultOptions, callback) {
    var word = "";
    var counter = 0;
    new Promise((resolve, reject) => {
        for (var i = 0; i < length; i++) {
            RandomSyllable("", options, (syllable) => {
                word = word.concat(syllable);
                counter++;
                if (counter == length) {
                    resolve();
                }
            })
        }
    }).then(() => { callback(word); });
};

// Generate name
function RandomName(langOptions = defaultOptions, callback) {
    var options = CheckEmpty(langOptions) ? defaultOptions : langOptions;
    nameStructure = PickRandom(options.names.firstNames);
    RandomSyllable(nameStructure, options, (name) => {
        callback(_.capitalize(name));
    })
}

/* EXPORT */
module.exports = {
    messages,
    hello: SayHello,
    syllable: RandomSyllable,
    word: RandomWord,
    name: RandomName
}

/* UTILITIES */

// Check if object is empty
function CheckEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

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

/* TEST AREA */

/*RandomSyllable("", elvishOptions, syllable => {
    console.log("Random syllable: " + syllable);
})*/

/*RandomWord(3, elvishOptions, (word) => {
    console.log("Random word: " + word);
})*/

/*RandomName(elvishOptions, (name) => {
    console.log("Random name: " + name);
})*/