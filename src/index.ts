import { UseCase } from "./base";
import { users } from "./mock/users";

type TestContextInput = { id: string };
type TestContextLoad = { name: string; id: string } | undefined;
type TestUseCaseOutput = { name: string } | undefined;

class Test extends UseCase<
  TestContextInput,
  TestContextLoad,
  TestUseCaseOutput
> {
  constructor() {
    super();
    this.setMethods([
      this.validate,
      this.processing,
      this.mapping,
    ]);
  }

  async validate(input: TestContextInput): Promise<TestContextInput> {
    if (!input.id) throw new Error("Id must be exist");

    return input;
  }

  async processing(input: TestContextInput): Promise<TestContextLoad> {
    const userIsFound = users.find((u) => u.id === input.id);
    return userIsFound;
  }

  async mapping(input: TestContextLoad): Promise<TestUseCaseOutput> {
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
