import { Film } from "./Types";

export class QueryList {
  private _movieList?: Film[];

  get movieList() {
    if (!this._movieList) {
      return [];
    }
    return this._movieList;
  }

  set movieList(list: Film[]) {
    this._movieList = list;
  }

  renderMovieList = () => {
    const listContainer = document.querySelector("#query-list-container")!;
    listContainer.innerHTML = "";
    const liHeader = document.createElement("li");
    const h5Header = document.createElement("h5");
    liHeader.classList.add("list-header");
    h5Header.classList.add("list-header-h5");
    h5Header.textContent = "Nome";
    liHeader.appendChild(h5Header);
    listContainer.appendChild(liHeader);

    this.movieList.forEach((film) => {
      const li = document.createElement("li");
      const h5 = document.createElement("h5");
      const btn = document.createElement("btn");
      li.classList.add("list");
      h5.classList.add("text-gray-800");
      h5.textContent = film.title;
      btn.classList.add("list-btn");
      btn.textContent = "Adicionar";
      li.appendChild(h5);
      li.appendChild(btn);
      listContainer?.appendChild(li);
    });
  };
}
