/**
 * The pre-defined Elvish language.
 * @module Elvish
 * @author Peter Vertesi <info@petervertesi.com>
 * @copyright Peter Vertesi, 2020
 * @exports {Language} Elvish
 */

const Language = require('../classes/language');

/* Language options */

const options = {
    name: 'Elvish',
    id: 'ELV',
    desc: 'Language of the Elves of Kherret.',
    phonology: {
        inventory: {
            vowels: {
                low: ['a', 'o', 'u'], //aka open
                mid: [],
                high: ['e', 'i','y'] //aka closed
            },
            consonants: {
                glides: ['bw','tw','dw','dhw','cw','gw'],
                liquids: ['bl', 'br', 'pr', 'tr', 'dl', 'dr', 'cl', 'cr', 'gl', 'gr'],
                nasals: ['m', 'n', 'nn'],
                fricatives: ['f', 'v', 'th', 's', 'ch'],
                affricates: ['b', 'p', 't', 'd', 'dh', 'c', 'g']
            }
        },
        phonotactics: {
            onsets: [[], ['consonants', 'fricatives'], ['consonants', 'fricatives'], ['consonants', 'fricatives'], ['consonants', 'fricatives'], ['consonants', 'affricates'], ['consonants', 'affricates'], ['consonants', 'affricates'], ['consonants', 'liquids'], ['consonants', 'liquids'], ['consonants', 'glides']],
            nuclei: [['vowels', 'low'], ['vowels', 'high']],
            codas: [[], ['consonants', 'nasals']]
        },
        constraints: {
            noLiquidAfterCoda: true,
            noGlideafterCoda: true,
            noDoubleNucleus: true,
        },
        other: {
            maxWordLength: 3
        },
        inventorySimple: {
            A: ['l', 'w'],
            C: ['b', 'c', 'ch', 'd', 'dh', 'f', 'g', 'l', 'm', 'n', 'p', 'r', 's', 't', 'th', 'v'],
            D: ['ya', 'ye', 'yo', 'yu'],
            F: ['d', 'dh', 'n', 'nn', 'ch', 'l', 'g', 'r', 's'],
            S: ['f', 'v', 'th', 's'],
            V: ['a', 'e', 'i', 'o', 'u', 'y', 'ae', 'oe']
        },
        phonotacticsSimple: ['CV', 'SV', 'CAV', 'SAV', 'SVF', 'SAVF', 'CAVF', 'CVF', 'VF', 'SDF', 'SADF', 'CADF', 'CDF', 'DF'],
    },
    names: {
        firstNames: {
            male: ['SVFV', 'SVAV', 'CVFV', 'CVAV', 'SVFVFV', 'SVAVFV', 'CVFVFV', 'CVAVFV', 'SVFVF', 'SVAVF', 'CVFVF', 'CVAVF'],
            female: ['SVFV', 'SVAV', 'CVFV', 'CVAV', 'SVFVFV', 'SVAVFV', 'CVFVFV', 'CVAVFV', 'SVFVF', 'SVAVF', 'CVFVF', 'CVAVF'],
            neutral: ['SVFV', 'SVAV', 'CVFV', 'CVAV', 'SVFVFV', 'SVAVFV', 'CVFVFV', 'CVAVFV', 'SVFVF', 'SVAVF', 'CVFVF', 'CVAVF']
        }
    }
};

/* Create Language */

const Elvish = new Language(options);

/* EXPORT */

module.exports = Elvish;