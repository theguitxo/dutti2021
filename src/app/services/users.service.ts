import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { StorageService, STORAGE_VALUES } from "./storage.service";

enum STORAGE_KEYS {
  USERS = 'users',
  LOGGED = 'logged',
  LOGGED_USER_DATA = 'logged_user_data',
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _usersList: Array<User>;
  private _errorMessage: string;

  get errorMessage(): string {
    return this._errorMessage;
  }

  constructor(
    private storageService: StorageService,
  ){
    this._usersList = this.storageService.getJSONValue(STORAGE_VALUES.LOCAL, STORAGE_KEYS.USERS);
    if (this._usersList === null) {
      this._usersList = [];
    }
  }

  addUser(user: User): boolean {
    if (this._usersList.find(i => i.username.toLowerCase() === user.username.toLowerCase())) {
      this._errorMessage = `User ${user.username} already exists`;
      return false;
    }

    const tempUserList = [...this._usersList, user];

    const save = this.storageService.setJSONValue(STORAGE_VALUES.LOCAL, STORAGE_KEYS.USERS, tempUserList);
    if (save) {
      this._usersList.push(user);
      return true;
    }

    return false;
  }

  loginUser(user: string, password: string): boolean {
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

  isLoged(): boolean {
    if (this.storageService.keyExists(STORAGE_VALUES.SESSION, STORAGE_KEYS.LOGGED) &&
      this.storageService.getValue(STORAGE_VALUES.SESSION, STORAGE_KEYS.LOGGED) === '1') {
        return true;
      }

    return false;
  }
}
