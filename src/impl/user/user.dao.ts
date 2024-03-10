import { USERS, User } from "./users.mock";

export interface IUserDao {
        findById({id} :{id: string}): User | undefined;
}
export class UserDao {
        findById({id}: {id: string}){
                return USERS.find(u => u.id === id);
        }
}