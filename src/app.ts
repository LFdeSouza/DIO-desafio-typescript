import { ListIndexOperation, QueryResponse } from "./Types";
import { User } from "./User";
import { QueryList } from "./QueryList";

const apiKey = "3f301be7381a03ad8d352314dcc3ec1d";
let sessionUser: User | undefined;

// Login
const usernameInput = document.querySelector("#username")! as HTMLInputElement;
const passwordInput = document.querySelector("#password")! as HTMLInputElement;
const loginBtn = document.querySelector("#login-button")!;

loginBtn.addEventListener("click", (e) => handleLogin(e));

const handleLogin = async (e: Event) => {
  e.preventDefault();
  const newUser = await new User(
    usernameInput.value,
    passwordInput.value,
    apiKey
  );
  const isUserValidated = await newUser.loginUser();

  if (isUserValidated) {
    sessionUser = newUser;
    toggleForm();
    toggleFormBtn.textContent = "Log out";
    toggleFormBtn.removeEventListener("click", toggleForm);
    toggleFormBtn.addEventListener("click", logOut);
    sessionUser.renderUserLists();
  }
  clearLoginInputs();
};

const clearLoginInputs = () => {
  usernameInput.value = "";
  passwordInput.value = "";
};

const logOut = () => {
  sessionUser = undefined;
  toggleFormBtn.textContent = "Log in";
  toggleFormBtn.removeEventListener("click", logOut);
  toggleFormBtn.addEventListener("click", toggleForm);
  toggleForm();
};

// Control form display
const toggleFormBtn = document.querySelector("[data-form-toggle-btn]")!;
const form = document.querySelector("[data-login-form]");

const toggleForm = () => {
  if (form?.classList.contains("hidden")) {
    form.classList.toggle("hidden");
    setTimeout(() => form.classList.toggle("-translate-x-56"), 1);
  } else {
    form?.classList.toggle("-translate-x-56");
    setTimeout(() => form?.classList.toggle("hidden"), 200);
  }
};
toggleFormBtn.addEventListener("click", toggleForm);

// Search movies
const queryInput = document.querySelector("#search")! as HTMLInputElement;
const searchBtn = document.querySelector("#search-button")!;
let queryList = new QueryList();

searchBtn.addEventListener("click", () => {
  const query = queryInput.value;
  searchMovies(query);
});

const searchMovies = async (query: string) => {
  query = encodeURI(query);
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
  );
  const data = (await res.json()) as QueryResponse;
  queryList.movieList = data.results;
  queryList.renderMovieList();
};

export const addMovieToList = async (id: string) => {
  if (!sessionUser) return;
  const URL = `
  https://api.themoviedb.org/3/list/${sessionUser.currList?.id}/add_item?api_key=${apiKey}&session_id=${sessionUser.session_id}`;
  const body = {
    media_id: id,
  };
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  await fetch(URL, config);
  await sessionUser.renderUserLists();
};

//Create List
const listNameField = document.querySelector(
  "#create-list-field"
) as HTMLInputElement;
const createListBtn = document.querySelector("#create-list-btn");

createListBtn?.addEventListener("click", () => {
  if (sessionUser) {
    sessionUser.createList(listNameField.value);
  }
});

// move through lists
const incrementListBtn = document.querySelector("#increment")!;
const decrementListBtn = document.querySelector("#decrement")!;

incrementListBtn.addEventListener("click", () =>
  sessionUser?.changeListIndex(ListIndexOperation.increment)
);
decrementListBtn.addEventListener("click", () =>
  sessionUser?.changeListIndex(ListIndexOperation.decrement)
);
