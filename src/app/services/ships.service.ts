import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  cacheType = 'SHIPS';

  url: string = 'https://swapi.dev/api/starships/'
  headerDict = {
    'Authorization': 'none',
    'Access-Control-Allow-Origin': '*'
  }
  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
  ) {}

  getShips(page: number): Observable<any>{
    const cacheData = this.cacheService.getItem(this.cacheType, page);

    if (cacheData !== null) {
      return new Observable<any>(observer => {
        observer.next(cacheData);
        observer.complete();
      });
    }

    return this.http.get(`${this.url}?page=${page}`).pipe(
      map( data => {
          this.cacheService.addItem(this.cacheType, page, data);
          return data;
        })
      );
  }
}
