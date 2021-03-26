import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { StorageService, STORAGE_VALUES } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _usersKey: string = 'users';
  private _usersList: Array<User>;
  private _errorMessage: string;

  get errorMessage(): string {
    return this._errorMessage;
  }

  constructor(
    private storageService: StorageService,
  ){
    this._usersList = this.storageService.getJSONValue(STORAGE_VALUES.LOCAL, this._usersKey);
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
    
    const save = this.storageService.setJSONValue(STORAGE_VALUES.LOCAL, this._usersKey, tempUserList);
    if (save) {
      this._usersList.push(user);
      return true;
    }

    return false;
  }
}
