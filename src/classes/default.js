/**
 * Default options for a new {@link Language}.
 * @constant
 * @memberof Language
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
                affricates: ['b', 'p', 't', 'd', 'k', 'g']
            }
        },
        phonotactics: {
            onsets: [[], ['consonants', 'fricatives'], ['consonants', 'affricates'], ['consonants', 'liquids']],
            nuclei: [['vowels', 'low'], ['vowels', 'high']],
            codas: [[], ['consonants', 'nasals']]
        },
        constraints: {
            noLiquidAfterCoda: true,
            noDoubleNucleus: true,
        },
        other: {
            maxWordLength: 5,
        },
        inventorySimple: {
            C: ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'],
            V: ['a', 'e', 'i', 'o', 'u']
        },
        phonotacticsSimple: ['CVC']
    },
    names: {
        firstNames: {
            male: ['CVC'],
            female: ['CVC'],
            neutral: ['CVC']
        }
    }
};

module.exports = options;