"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCase = void 0;
class UseCase {
    _methods = [];
    get methods() {
        return this._methods;
    }
    setMethods(methods) {
        this._methods = methods;
    }
    async execute(input) {
        if (this._methods.length) {
            const FIRST_METHOD = 0;
            let outputMethod = input;
            for (let i = FIRST_METHOD; i < this._methods.length; i++) {
                outputMethod = await this._methods[i](outputMethod);
            }
            return outputMethod;
        }
        else
            throw new Error("Methods are null");
    }
}
exports.UseCase = UseCase;
