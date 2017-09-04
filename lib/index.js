"use strict";

const forEach = require("iterate-object")

module.exports = class i18nError {
    constructor (errors = {}) {
        this._errors = {}
        this._lang = null
        this.add(errors)
    }

    _get (info) {
        
        // The error message gets checked out and temporarily memorized
        let errMsg = info.err.message
        errMsg = errMsg[this._lang] || errMsg
        if (typeof errMsg === "object") {
            for (let k in errMsg) {
                errMsg = errMsg[k]
                break
            }
        }
        
        // The identified language influences the replacement of the error message

        for (let i = 1; i < arguments.length; ++i) {
            errMsg = errMsg.replace(new RegExp("{" + i + "+}", "g"), arguments[i]);
        }

        const err = new Error(errMsg)
        Object.keys(info.err).forEach(c => {
            if (c === "message") { return }
            err[c] = info.err[c]
        })
        return err
    }

    setLang (lang) {
        this._lang = lang
    }

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
