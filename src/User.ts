import { ReqTokenRes, CreateSessionRes } from "./Types";

export class User {
  private request_token?: string;
  private session_id?: string;

  constructor(
    private username: string,
    private password: string,
    private apiKey: string
  ) {
    this.loginUser();
  }

  isUserValidated(): boolean {
    return this.session_id ? true : false;
  }

  async loginUser() {
    await this.generateToken();
    await this.validateToken();
    await this.createSession();
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

  async createList(name: string, description: string) {
    const URL = `https://api.themoviedb.org/3/list?api_key=${this.apiKey}&session_id=${this.session_id}`;
    const body = {
      name,
      description,
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(URL, config);
    const data = await res.json();
    console.log(data);
  }
}
