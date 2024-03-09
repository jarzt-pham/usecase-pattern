export abstract class UseCase<
  UseCaseContextInput,
  UseCaseContextLoad,
  UseCaseContextOutput
> {
  private _methods: Function[] = [];

  protected get methods() {
    return this._methods;
  }

  protected setMethods(methods: Function[]) {
    this._methods = methods;
  }

  async execute(input: UseCaseContextInput) {
    if (this._methods.length) {
      const FIRST_METHOD = 0;
      let outputMethod = input;

      for (let i = FIRST_METHOD; i < this._methods.length; i++) {
        outputMethod = await this._methods[i](outputMethod);
      }
      return outputMethod;
    } else throw new Error("Methods are null");
  }

  abstract validate(input: UseCaseContextInput): Promise<UseCaseContextInput>;
  abstract processing(
    input: Awaited<ReturnType<typeof this.validate>>
  ): Promise<UseCaseContextLoad>;
  abstract mapping(
    input: Awaited<ReturnType<typeof this.processing>>
  ): Promise<UseCaseContextOutput>;
}
