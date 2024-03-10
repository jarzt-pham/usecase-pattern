import { FindUserByIdUseCase } from "./impl";

const findUserByIdUseCase = new FindUserByIdUseCase();
const userIsFound = findUserByIdUseCase.execute({id: '123'});
userIsFound.then((user) => console.log({ user }));
