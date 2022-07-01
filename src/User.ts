import {
  ReqTokenRes,
  CreateSessionRes,
  AccountDetailsRes,
  ListRes,
  List,
  ListIndexOperation,
} from "./Types";

export class User {
  private request_token?: string;
  public session_id?: string;
  private account_id?: number;
  private listsIds: number[] = [];
  public currList?: List;
  private currListIndex = 0;

  constructor(
    private username: string,
    private password: string,
    private apiKey: string
  ) {}

  async loginUser() {
    await this.generateToken();
    await this.validateToken();
    await this.createSession();
    await this.getAccountId();
    return this.session_id ? true : false;
  }

  async generateToken() {
    try {
      const URL = `https://api.themoviedb.org/3/authentication/token/new?api_key=${this.apiKey}`;
      const res = await fetch(URL);
      const data = (await res.json()) as ReqTokenRes;
      this.request_token = data.request_token;
    } catch (error) {
      console.log("Somehting went wrong:", error);
    }
  }

  async validateToken() {
    try {
      const URL = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${this.apiKey}`;
      const user = {
        username: this.username,
        password: this.password,
        request_token: this.request_token,
      };
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      await fetch(URL, config);
    } catch (error) {
      console.log("Somehting went wrong:", error);
    }
  }

  async createSession() {
    try {
      const URL = `https://api.themoviedb.org/3/authentication/session/new?api_key=${this.apiKey}&request_token=${this.request_token}`;
      const res = await fetch(URL);
      const data = (await res.json()) as CreateSessionRes;
      this.session_id = data.session_id;
    } catch (error) {
      console.log("Somehting went wrong:", error);
    }
  }

  async getAccountId() {
    try {
      const URL = `
      https://api.themoviedb.org/3/account?api_key=${this.apiKey}&session_id=${this.session_id}`;
      const res = await fetch(URL);
      const data = (await res.json()) as AccountDetailsRes;
      this.account_id = data.id;
    } catch (error) {
      console.log("Somehting went wrong:", error);
    }
  }

  async getUserLists() {
    try {
      this.listsIds = [];
      const URL = `
      https://api.themoviedb.org/3/account/${this.account_id}/lists?api_key=${this.apiKey}&session_id=${this.session_id}&page=1`;
      const res = await fetch(URL);
      const data = (await res.json()) as ListRes;
      data.results.forEach((item) => this.listsIds.push(item.id));
    } catch (error) {
      console.log("Somehting went wrong:", error);
    }
  }

  async createList(name: string) {
    const URL = `https://api.themoviedb.org/3/list?api_key=${this.apiKey}&session_id=${this.session_id}`;
    const body = {
      name,
      description: "",
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    await fetch(URL, config);
    this.currListIndex = this.listsIds.length;
    this.renderUserLists();
  }

  changeListIndex(operation: ListIndexOperation) {
    if (
      (this.currListIndex === 0 && operation === "decrement") ||
      (this.currListIndex === this.listsIds.length - 1 &&
        operation === "increment")
    )
      return;
    operation === "increment" ? this.currListIndex++ : this.currListIndex--;
    this.renderUserLists();
  }

  async renderUserLists() {
    //fetch list details
    await this.getUserLists();
    const URL = `https://api.themoviedb.org/3/list/${
      this.listsIds[this.currListIndex]
    }?api_key=${this.apiKey}`;
    const res = await fetch(URL);
    const data = (await res.json()) as List;
    this.currList = data;

    //create List container
    document.querySelector("#alert-login-list")!.classList.add("hidden");
    const btnContainer = document.querySelector("#user-list-btn-container")!;
    btnContainer.classList.remove("hidden");
    btnContainer.classList.add("flex");

    //header
    const userListContainer = document.querySelector("#user-list-container")!;
    userListContainer.innerHTML = "";
    const liHeader = document.createElement("li");
    const h5Header = document.createElement("h5");
    liHeader.classList.add("list-header");
    h5Header.classList.add("list-header-h5");
    h5Header.textContent = data.name;
    liHeader.appendChild(h5Header);
    userListContainer.appendChild(liHeader);

    //list items
    if (this.currList) {
      this.currList.items.forEach((film) => {
        const li = document.createElement("li");
        const h5 = document.createElement("h5");
        li.classList.add("list");
        h5.classList.add("text-gray-800");
        h5.textContent = film.title;
        li.appendChild(h5);
        userListContainer?.appendChild(li);
      });
    }
  }
}
