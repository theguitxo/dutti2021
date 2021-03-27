import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../enums/users.enum";
import { User } from "../interfaces/user.interface";
import { ManageUsers } from "./manageUsers.service";
import { StorageService, STORAGE_VALUES } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends ManageUsers {
  constructor(protected storageService: StorageService){
    super(storageService);
  }

  logIn(user: string, password: string): boolean {
    this.updateUsersList();
    const userData:User = this._usersList.find(i => i.username.toLowerCase() === user.toLowerCase());

    if (userData) {
      if (password !== userData.password) {
        this._errorMessage = `Password not valid`;
        return false;
      }
    } else {
      this._errorMessage = `User ${user} don't exists`;
      return false;
    }

    this.storageService.setValue(STORAGE_VALUES.SESSION, STORAGE_KEYS.LOGGED, '1');
    this.storageService.setJSONValue(STORAGE_VALUES.SESSION, STORAGE_KEYS.LOGGED_USER_DATA, userData);
    return true;
  }

  get isLogged(): boolean {
    if (this.storageService.keyExists(STORAGE_VALUES.SESSION, STORAGE_KEYS.LOGGED) &&
      this.storageService.getValue(STORAGE_VALUES.SESSION, STORAGE_KEYS.LOGGED) === '1') {
        return true;
      }

    return false;
  }

  logOff(): void {
    this.storageService.deleteValue(STORAGE_VALUES.SESSION, STORAGE_KEYS.LOGGED);
    this.storageService.deleteValue(STORAGE_VALUES.SESSION, STORAGE_KEYS.LOGGED_USER_DATA);
  }
}
