"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const users_1 = require("./mock/users");
class Test extends base_1.UseCase {
    constructor() {
        super();
        this.setMethods([
            this.validate,
            this.processing,
            this.mapping,
        ]);
    }
    async validate(input) {
        if (!input.id)
            throw new Error("Id must be exist");
        return input;
    }
    async processing(input) {
        const userIsFound = users_1.users.find((u) => u.id === input.id);
        return userIsFound;
    }
    async mapping(input) {
        return input?.name
            ? {
                name: input?.name,
            }
            : undefined;
    }
}
const test = new Test();
const data = test.execute({ id: "65ecaeaf227fd89b47f9b8a7" });
data.then((rs) => console.log({ rs }));
