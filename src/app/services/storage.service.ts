import { Injectable } from '@angular/core';

export enum STORAGE_VALUES {
  LOCAL,
  SESSION,
}

/**
 * StorageService
 * class for manage the local storage of the browser
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * store
   * this function permits choose a storage by type
   * @param type a enum that indicates the type of storage to use
   *             SESSION = session storage, LOCAL = local storage
   * @returns null if the type of storage isn't indicted, otherwise, the storage
   */
  private store(type: STORAGE_VALUES): any | null {

    if (type === STORAGE_VALUES.SESSION) {
      return sessionStorage;
    } else if (type === STORAGE_VALUES.LOCAL) {
      return localStorage;
    }

    return null;

  }

  /**
   * setValue
   * saves a value into the storage
   * @param type the type of storage to use
   * @param key name of the key to save the value
   * @param value the value that be saved
   * @returns true if the value was saved correctly, otherwise, false
   */
  setValue(type: STORAGE_VALUES, key: string, value: string): boolean {

    try{
      this.store(type).setItem(key.toUpperCase(), value);
      return true;
    } catch (e) {
      return false;
    }

  }

  /**
   * getValue
   * get a value of the storage
   * @param type the type of storage where get the value
   * @param key the key that contains the value to get
   * @returns the value, if it exists into the storage, otherwise, null
   */
  getValue(type: STORAGE_VALUES, key: string): null | string {

    try {
      return this.store(type).getItem(key.toUpperCase());
    } catch (e) {
      return null;
    }

  }

  /**
   * keyExists
   * checks if a key exists into the local storage
   * @param type the type of storage where check the key
   * @param key the key to check
   * @returns true if exists, false if not, null in case of error
   */
  keyExists(type: STORAGE_VALUES, key: string): null | boolean {

    try {
      return this.store(type).hasOwnProperty(key.toUpperCase());
    } catch (e) {
      return null;
    }

  }

  /**
   * deleteValue
   * delete a value of the local storage
   * @param type the type of storage where is the value to delete
   * @param key the key that contains the value to delete
   */
  deleteValue(type: STORAGE_VALUES, key: string): boolean | null {

    try {
      this.store(type).removeItem(key.toUpperCase());
    } catch (e) {
      return null;
    }

  }

  /**
   * getJSONValue
   * return a value of the storage as a JSON data
   * @param type the type of storage where get the value
   * @param key the key that contains the value to get
   * @returns the value, if it exists into the storage, otherwise, null
   */
  getJSONValue(type: STORAGE_VALUES, key: string): any | null {
    const valueString = this.getValue(type, key);

    try {
      return JSON.parse(valueString);
    } catch (e) {
      return null;
    }
  }

  /**
   * setJSONValue
   * saves a values into the storage as a JSON data
   * @param type the type of storage to use
   * @param key name of the key to save the value
   * @param value the value that be saved
   * @returns true if the value was saved correctly, otherwise, false
   */
  setJSONValue(type: STORAGE_VALUES, key: string, value: any): boolean {

    let valueString: string = '';

    try {
      valueString = JSON.stringify(value);
    } catch (e) {
      return false;
    }

    return this.setValue(type, key, valueString);

  }

}
