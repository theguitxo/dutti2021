import { STORAGE_KEYS } from "../enums/users.enum";
import { User } from "../interfaces/user.interface";
import { StorageService, STORAGE_VALUES } from "./storage.service";

export abstract class ManageUsers {
  protected _usersList: Array<User>;
  protected _errorMessage: string;

  get errorMessage(): string {
    return this._errorMessage;
  }

  constructor(
    protected storageService: StorageService,
  ){
    this.updateUsersList();
  }

  updateUsersList(): void {
    this._usersList = this.storageService.getJSONValue(STORAGE_VALUES.LOCAL, STORAGE_KEYS.USERS);
    if (this._usersList === null) {
      this._usersList = [];
    }
  }
}
