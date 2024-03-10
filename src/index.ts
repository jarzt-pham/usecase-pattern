import { FindUserByIdUseCase } from "./impl";

const findUserByIdUseCase = new FindUserByIdUseCase();

console.log({methods: findUserByIdUseCase.getMethods()})

const userIsFound = findUserByIdUseCase.execute({
  id: "65ecaeaf227fd89b47f9b8a7",
});
userIsFound.then((user) => console.log(user));


// findUserByIdUseCase.setExistMethodsInClass();

// console.log({methods: findUserByIdUseCase.getMethods()})