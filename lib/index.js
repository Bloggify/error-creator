"use strict";

const forEach = require("iterate-object")

module.exports = class ErrorCreator {

    /**
     * ErrorCreator
     * Creates a new instance of `ErrorCreator`.
     *
     * @name ErrorCreator
     * @function
     * @param {Object} errors = {} An object containing the errors' information. This is passed to the `add` method.
     */
    constructor (errors = {}) {
        this._errors = {}
        this._lang = null
        this.add(errors)
    }

    /*!
     * _get
     * This method creates the error object. Used internally.
     *
     * @name _get
     * @function
     * @param {Object} info The error info.
     * @returns {Error} The Error object.
     */
    _get (info) {
        let errMsg = info.err.message
        errMsg = errMsg[this._lang] || errMsg
        if (typeof errMsg === "object") {
            for (let k in errMsg) {
                errMsg = errMsg[k]
                break
            }
        }

        for (let i = 1; i < arguments.length; ++i) {
            errMsg = errMsg.replace(new RegExp("{" + i + "+}", "g"), arguments[i]);
        }

        const err = new Error(errMsg)
        err.code = info.name

        Object.keys(info.err).forEach(c => {
            if (c === "message") { return }
            err[c] = info.err[c]
        })
        return err
    }

    /**
     * setLang
     * Sets the preffered error language.
     *
     * @name setLang
     * @function
     * @param {String} lang A preffered language for erro messages.
     * @return {ErrorCreator} The `ErrorCreator` instance.
     */
    setLang (lang) {
        this._lang = lang
        return this
    }

    /**
     * add
     * Adds one or more error objects.
     *
     * @name add
     * @function
     * @param {String|Object} name The error name. If an object, it should look like this:
     *
     *    ```js
     *    {
     *       USER_NOT_FOUND: {
     *          message: "The user was not found.",
     *          status: 404
     *       },
     *       ARTICLE_NOT_FOUND: {
     *          message: "The article was not found.",
     *          status: 404
     *       }
     *    }
     *    ```
     *
     * @param {Object} err The error message or object containing th message.
     * @returns {ErrorCreator} The `ErrorCreator` instance.
     */
    add (name, err) {

        //The error is added
        if (typeof name === "object") {
            forEach(name, (err, name) => this.add(name, err))
            return this
        }
        if (typeof err === "string") {
            err = { message: err }
        }

        //The new function is created and the paramater gets returned
        this._errors[name] = err
        this[name] = this._get.bind(this, {
            err,
            name
        })
        return this
    }
}
