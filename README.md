# Falagico

![npm version](https://img.shields.io/npm/v/falagico)
![falagico build status](https://travis-ci.com/vpeter1119/falagico.svg?branch=master)

FaLaGiCo stands for Fantasy Language Gibberish Converter. You can enter any text and Falagico converts it to a gibberish that looks like the selected fantasy language. This hobby project is entirely non-commercial.

## Get Started

To add Falagico to your package, use the following command:

    npm install falagico

In your code, require Falagico and create a new Language instance. Through the Language instances, you can access all methods Falagico provides. For more information, see the API documentation.

    const { Language } = require('falagico');
    const Gibberish = new Language();
    
    var message = Gibberish.Text();
    console.log(message); // Gibberish text consisting of 1-10 sentences.

The constructor `new Language()` without parameters creates a new `Language` instance with the default config options. You can also use Falagico's default languages through `falagico.languages`.

    const { Language, languages } = require('falagico');
    const Elvish = languages.Elvish;
    
    var message = Elvish.Text();
    console.log(message); // Elvish text consisting of 1-10 sentences.

## Configuration

It is possible to configure new Language instances by providing a `langOptions` object to the `new Language(langOptions)` constructor. For more information, see the API documentation.
