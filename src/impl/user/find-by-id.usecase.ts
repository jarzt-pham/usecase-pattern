import { UseCase } from "../../base";
import { IUserDao, UserDao } from "./user.dao";

export module UserContext {
  export type Input = {id: string};
  export type Load = {id: string; name: string} | undefined;
  export type Output = { user: {id: string, name: string } } | undefined;
}

export class FindUserByIdUseCase extends UseCase<UserContext.Input, UserContext.Load, UserContext.Output> {
        private _dao: IUserDao;
        constructor(){
                super();
                this._dao = new UserDao();
                this.setMethods([this.validate, this.processing, this.mapping]);
        }

        validate = async (input: UserContext.Input) => {
                if(!input.id) throw new Error('id must be exist');

                return {id: input.id};
        }

        processing = async (input: UserContext.Input) => {
                const user = this._dao.findById({id: input.id});
                return user;
        }

        mapping = async (input: UserContext.Load)=> {
                return input?.id ? {
                        user: {
                                id: input.id,
                                name: input.name
                        }
                } : undefined
        }

}
