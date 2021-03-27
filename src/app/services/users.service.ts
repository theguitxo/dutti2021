import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../enums/users.enum";
import { User } from "../interfaces/user.interface";
import { ManageUsers } from "./manageUsers.service";
import { StorageService, STORAGE_VALUES } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ManageUsers {
  constructor(protected storageService: StorageService){
    super(storageService);
  }

  addUser(user: User): boolean {
    this.updateUsersList();
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
}
