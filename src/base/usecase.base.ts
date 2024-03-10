export abstract class UseCase<UsecaseInput, UsecaseOutput> {
  private _methods: any[] = [];

  protected get methods() {
    return this._methods;
  }

  protected setMethods(): any;
  protected setMethods<UsecaseOutput>(
    ...methods: [fn: (input: UsecaseInput) => Promise<UsecaseOutput>]
  ): any;
  protected setMethods<O1>(
    ...methods: [
      fnO1: (input: UsecaseInput) => Promise<O1>,
      fnO2: (input: Awaited<O1>) => Promise<UsecaseOutput>
    ]
  ): any;
  protected setMethods<O1, O2>(
    ...methods: [
      fnO1: (input: UsecaseInput) => Promise<O1>,
      fnO2: (input: Awaited<O1>) => Promise<O2>,
      fnO3: (input: Awaited<O2>) => Promise<UsecaseOutput>
    ]
  ): any;

  protected setMethods(...methods: any[]) {
    if (methods.length === 0) {
      for (var property in this) {
        if (typeof this[property] === "function") {
          console.log({ property });
          this._methods.push(this[property]);
        }
      }
    } else {
      this._methods = methods;
    }
  }

  public async execute(parameterFunction: any) {
    let resultOfFunction = parameterFunction;

    if (this._methods.length > 0) {
      const methodsAreExecuted = this._methods;
      const FIRST_METHOD = 0;

      for (let i = FIRST_METHOD; i < methodsAreExecuted.length; i++) {
        resultOfFunction = await methodsAreExecuted[i](resultOfFunction);
      }
    } else throw new Error("Methods is null");

    return resultOfFunction;
  }
}
