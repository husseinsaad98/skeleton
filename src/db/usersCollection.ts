import PocketBase from "pocketbase";
import { cookies } from "next/headers";
import { Roles } from "@/enums";
import { User } from "@/models/account";
export const POCKET_BASE_URL = "http://127.0.0.1:8090";

export class UsersCollection {
  client: PocketBase;

  constructor(client: PocketBase) {
    const POCKET_BASE_URL = "http://127.0.0.1:8090";
    this.client = new PocketBase(POCKET_BASE_URL);
  }
  async getUsers(): Promise<User[]> {
    await this.getUser();
    const result = await this.client.collection("users").getList();
    return result.items as User[];
  }

  async authenticate(email: string, password: string) {
    const result = await this.client
      .collection("users")
      .authWithPassword(email, password);

    if (!result?.token || result.record.role !== Roles.admin) {
      throw new Error("Invalid email or password");
    }
    console.log(result.token);
    this.client.authStore.save(result.token, result.record.model);
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

  async isAuthenticated() {
    const cookieStore = cookies();
    const cookie = cookieStore.get("pb_auth");
    if (!cookie) {
      return false;
    }

    this.client.authStore.loadFromCookie(cookie?.value || "");
    console.log(this.client.authStore);
    return this.client.authStore.isValid || false;
  }

  async getUser() {
    const cookieStore = cookies();
    const cookie = cookieStore.get("pb_auth");
    if (!cookie) {
      return false;
    }
    this.client.authStore.loadFromCookie(cookie?.value || "");
    return this.client.authStore.model;
  }
}
