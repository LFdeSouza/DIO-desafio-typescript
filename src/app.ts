import { Film, QueryResponse } from "./Types";
import { User } from "./User";
import { QueryList } from "./QueryList";

const apiKey = "3f301be7381a03ad8d352314dcc3ec1d";
let sessionUser;

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
  console.log(query);
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
  );
  const data = (await res.json()) as QueryResponse;

  queryList.movieList = data.results;
  console.log(queryList.movieList);
  queryList.renderMovieList();
  // renderMovieList(data.results);
};

// const renderMovieList = (movieList: Film[]) => {
//   const listContainer = document.querySelector("#query-list-container")!;
//   listContainer.innerHTML = "";
//   const liHeader = document.createElement("li");
//   const h5Header = document.createElement("h5");
//   liHeader.classList.add("list-header");
//   h5Header.classList.add("list-header-h5");
//   h5Header.textContent = "Nome";
//   liHeader.appendChild(h5Header);
//   listContainer.appendChild(liHeader);

//   movieList.forEach((film) => {
//     const li = document.createElement("li");
//     const h5 = document.createElement("h5");
//     const btn = document.createElement("btn");
//     li.classList.add("list");
//     h5.classList.add("text-gray-800");
//     h5.textContent = film.title;
//     btn.classList.add("list-btn");
//     btn.textContent = "Adicionar";
//     li.appendChild(h5);
//     li.appendChild(btn);
//     listContainer?.appendChild(li);
//   });
// };
