import { Injectable } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { StorageService, STORAGE_VALUES } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _usersKey: 'users';
  private _usersList: Array<User>;

  constructor(
    private storageService: StorageService,
  ){
    this._usersList = this.storageService.getJSONValue(STORAGE_VALUES.LOCAL, this._usersKey);
    if (this._usersList === null) {
      this._usersList = [];
    }
  }
}
