/**
 * Default options for a new {@link Language}.
 * @global
 * @type {langOptions}
 * @name defaultLangOptions
 */

const options = {
    name: 'Gibberish',
    id: 'GIB',
    desc: 'This is the default language for Falagico.',
    phonology: {
        inventory: {
            vowels: {
                low: ['a', 'o', 'u'], //aka open
                mid: [],
                high: ['e', 'i'] //aka closed
            },
            consonants: {
                glides: ['w'],
                liquids: ['bl', 'br', 'pr', 'tr', 'dl', 'dr', 'kl', 'kr', 'gl', 'gr'],
                nasals: ['m', 'n'],
                fricatives: ['f', 'v', 'th', 's', 'z', 'sh', 'h'],
                affricates: ['b', 'p', 't', 'd', 'k', 'g'],
                approximants: ['r', 'j', 'w', 'l']
            }
        },
        phonotactics: { // for all the things valid
            onsets: [[], ['consonants', 'fricatives'], ['consonants', 'affricates'], ['consonants', 'liquids'], ['consonants', 'approximants']],
            nuclei: [['vowels', 'low'], ['vowels', 'high']],
            codas: [[], ['consonants', 'nasals'], ['consonants', 'fricatives'], ['consonants', 'affricates'], ['consonants', 'approximants']],
            wordInits: [],
            fallbackInit: 't',
            wordFinals: ['r', 'l', 's', 'n'],
            fallbackFinal: 'r'
        },
        constraints: { // for all the thing invalid
            invalidCodaOnsetPairs: [
                [['consonants', 'ANY'], ['consonants', 'liquids']],
                [['consonants', 'ANY'], ['consonants', 'glides']],
                [['consonants', 'NULL'], ['consonants', 'NULL']]
            ],
            preventDouble: ['j', 'w', 'th', 'sh'],
            preventInits: ['p', 'z'],
            preventFinals: []
        },
        other: {
            maxWordLength: 3
        },
    },
    config: {
        adjustTypes: 2
    }
};

module.exports = options;