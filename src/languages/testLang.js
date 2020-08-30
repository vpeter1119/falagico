const Language = require("../classes/language");

/* Language options */

const options = {
    name: "Test Language",
    id: "TEST",
    desc: "This language is for testing only.",
    phonology: {
        inventoryAdv: {
            vowels: {
                low: ["a", "o", "u"], //aka open
                mid: [],
                high: ["e", "i"] //aka closed
            },
            consonants: {
                glides: ["w"],
                liquids: ["bl","br","pr","tr","dl","dr","kl","kr","gl","gr"],
                nasals: ["m", "n"],
                fricatives: ["f", "v", "th", "s", "z", "sh", "h"],
                affricates: ["b", "p", "t", "d", "k", "g"]
            }
        },
        phonotacticsAdv: {
            onsets: [[], ["consonants", "fricatives"], ["consonants", "affricates"], ["consonants", "liquids"]],
            nuclei: [["vowels", "low"], ["vowels", "high"]],
            codas: [[], ["consonants", "nasals"]]
        },
        constraints: {
            noLiquidAfterCoda: true,
            noDoubleNucleus: true,
        },
        inventorySimple: {
            C: ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"],
            V: ["a", "e", "i", "o", "u"]
        },
        phonotacticsSimple: ["CVC"]
    },
    names: {
        firstNames: {
            male: ["CVC"],
            female: ["CVC"],
            neutral: ["CVC"]
        }
    }
}


/* Create Language */

const TestLang = new Language(options);

/* EXPORT */

module.exports = TestLang;