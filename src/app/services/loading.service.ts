import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get isLoading(): Observable<boolean> {
    return this._isLoading.asObservable();
  }

  startLoading(): void {
    console.log('Is loading...');
    this._isLoading.next(true);
  }

  finishLoading(): void {
    console.log('Finish loading');
    this._isLoading.next(false);
  }
}
