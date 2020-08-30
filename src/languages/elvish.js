const Language = require("../classes/language");

/* Language options */

const options = {
    name: "Elvish",
    id: "ELV",
    desc: "Language of the Elves of Kherret.",
    phonology: {
        inventorySimple: {
            A: ["l", "w"],
            C: ["b", "c", "ch", "d", "dh", "f", "g", "l", "m", "n", "p", "r", "s", "t", "th", "v"],
            D: ["ya", "ye", "yo", "yu"],
            F: ["d", "dh", "n", "nn", "ch", "l", "g", "r", "s"],
            S: ["f", "v", "th", "s"],
            V: ["a", "e", "i", "o", "u", "y", "ae", "oe"]
        },
        phonotacticsSimple: ["CV", "SV", "CAV", "SAV", "SVF", "SAVF", "CAVF", "CVF", "VF", "SDF", "SADF", "CADF", "CDF", "DF"],
    },
    names: {
        firstNames: {
            male: ["SVFV", "SVAV", "CVFV", "CVAV", "SVFVFV", "SVAVFV", "CVFVFV", "CVAVFV", "SVFVF", "SVAVF", "CVFVF", "CVAVF"],
            female: ["SVFV", "SVAV", "CVFV", "CVAV", "SVFVFV", "SVAVFV", "CVFVFV", "CVAVFV", "SVFVF", "SVAVF", "CVFVF", "CVAVF"],
            neutral: ["SVFV", "SVAV", "CVFV", "CVAV", "SVFVFV", "SVAVFV", "CVFVFV", "CVAVFV", "SVFVF", "SVAVF", "CVFVF", "CVAVF"]
        }
    }
}

/* Create Language */

const Elvish = new Language(options);

/* EXPORT */

module.exports = Elvish;