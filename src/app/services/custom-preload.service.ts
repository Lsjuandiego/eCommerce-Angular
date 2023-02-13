import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadService implements PreloadingStrategy {

  constructor() { }

  preload(route: Route, load:()=> Observable<any>): Observable<any> {
    if(route.data && route.data['preload']){
      return load();
    }
    return of(null)
  }
}
