import PocketBase from "pocketbase";
import { UsersCollection } from "./usersCollection";

class Application {
  private pocketBaseInstance: PocketBase;
  public usersCollection: UsersCollection;

  constructor() {
    const POCKET_BASE_URL = "http://127.0.0.1:8090";
    this.pocketBaseInstance = new PocketBase(POCKET_BASE_URL);
    this.usersCollection = new UsersCollection(this.pocketBaseInstance);
  }
}

const app = new Application();

export default app;
