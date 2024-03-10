import { UseCase } from "../../base";
import { IUserDao, UserDao } from "./user.dao";

export module UserContext {
  export type Input = { id: string };
  export type Output = { user: { id: string; name: string } } | undefined;
  export type Context = { id: string; name: string } | undefined;
}

export type ResultOfClassMethod<T, K extends keyof T> = T[K] extends(...args: any) => infer R ? Awaited<R> : never;
export type ResultOfMethod<T extends (...args: any) => any> = Awaited<ReturnType<T>>


export class FindUserByIdUseCase extends UseCase<
  UserContext.Input,
  UserContext.Output
> {
  private _dao: IUserDao;

  constructor() {
    super();
    //     this.setMethods(this.validate, this.processing, this.mapping);
    //     this.setMethods();
    this._dao = new UserDao();
  }

  validate = async (input: UserContext.Input) => {
    if (!input.id) throw new Error("id must be exist");

    return { id: input.id };
  };

  processing = async (input: ResultOfClassMethod<FindUserByIdUseCase, 'validate'>) => {
        const user = this._dao.findById({ id: input.id});
        return user;
  };

  mapping = async (input: ResultOfMethod<typeof this.processing>) => {
        console.log(this.mapping.name);
        return input?.id
          ? {
              user: {
                id: input.id,
                name: input.name,
              },
            }
          : undefined;
  };
}
