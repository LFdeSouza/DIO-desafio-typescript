import { User } from "./User";

const apiKey = "3f301be7381a03ad8d352314dcc3ec1d";
let sessionUser;

//Login
const usernameInput = document.querySelector("#username")! as HTMLInputElement;
const passwordInput = document.querySelector("#password")! as HTMLInputElement;
const loginBtn = document.querySelector("#login-button")!;

loginBtn.addEventListener("click", () => handleLogin());

const handleLogin = async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;
  const newUser = await new User(username, password, apiKey);
  if (newUser.isUserValidated()) {
    sessionUser = newUser;
  }
};
