import PocketBase from "pocketbase";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const POCKET_BASE_URL = "http://127.0.0.1:8090";

export class UsersCollection {
  client: PocketBase;

  constructor(client: PocketBase) {
    this.client = client;
  }
  async getUsers() {
    const result = await this.client.collection("users").getList();
    return result;
  }

  async authenticate(email: string, password: string) {
    const result = await this.client
      .collection("users")
      .authWithPassword(email, password);
    console.log("authenticate result:", result);
    if (!result?.token) {
      throw new Error("Invalid email or password");
    }
    return result;
  }

  async register(email: string, password: string) {
    try {
      const result = await this.client.collection("users").create({
        email,
        password,
        passwordConfirm: password,
      });

      return result;
    } catch (err) {}
  }

  async isAuthenticated(cookieStore: ReadonlyRequestCookies) {
    const cookie = cookieStore.get("pb_auth");
    if (!cookie) {
      return false;
    }

    this.client.authStore.loadFromCookie(cookie?.value || "");
    return this.client.authStore.isValid || false;
  }

  async getUser(cookieStore: ReadonlyRequestCookies) {
    const cookie = cookieStore.get("pb_auth");
    if (!cookie) {
      return false;
    }

    this.client.authStore.loadFromCookie(cookie?.value || "");
    return this.client.authStore.model;
  }
}
