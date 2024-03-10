import { FindUserByIdUseCase } from "./impl";

const findUserByIdUseCase = new FindUserByIdUseCase();
const userIsFound = findUserByIdUseCase.execute({
  id: "65ecaeaf227fd89b47f9b8a7",
});
userIsFound.then((user) => console.log(user));
