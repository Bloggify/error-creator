"use strict"

const ErrorCreator = require("../lib")

const Errors = new ErrorCreator({
    NOT_AN_EVEN_NUMBER: {
        message: {
            en: "You did not enter an even number. You provided: {1}"
          , fr: "Vous n'avez pas saisi de numéro pair. Vous avez fourni: {1}"
        }

        // These static properties will be appended to the error object
        // (e.g. http status code etc)
      , status: 400
      , and: "any"
      , other: "fields"
      , you: "want"
      , to: "provide"
    }
})

const number = 41

if (number % 2 !== 0) {

    // If a language is not provided, it will automatically pick one
    console.log(Errors.NOT_AN_EVEN_NUMBER(number))
    // =>
    // { Error: You did not enter an even number. You provided: 41
    //     at ...
    //   status: 400,
    //   and: 'any',
    //   other: 'fields',
    //   you: 'want',
    //   to: 'provide' }

    // Set the language to French
    Errors.setLang("fr")

    console.log(Errors.NOT_AN_EVEN_NUMBER(number))
    // =>
    // { Error: Vous n'avez pas saisi de numéro pair. Vous avez fourni: 41
    //     at ...
    //   status: 400,
    //   and: 'any',
    //   other: 'fields',
    //   you: 'want',
    //   to: 'provide' }
}

// Add a new error
Errors.add({
    // Single language
    USER_PASS_NOT_MATCH: "Invalid credentials for username: {1}"
})

console.log(Errors.USER_PASS_NOT_MATCH("Alice"))
// Error: Invalid credentials for username: Alice
//     at ...
