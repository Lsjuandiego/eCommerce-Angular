import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { tap } from 'rxjs';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;

  private user = new BehaviorSubject<User | null>(null);
  //store global, observabl
  user$ = this.user.asObservable();

  constructor(private http: HttpClient,
    private tokenService:TokenService) {
  }

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`,{email,password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  getProfile(){
    //manera flexible:
    // const headers = new HttpHeaders();
    // headers.set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`)
    .pipe(
      tap(user => this.user.next(user))// una accion una vez recibido el perfil
    );
    // ,{
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     // 'content-type': 'application/json'
    //   }
    // });
  }

  loginAndGet(email:string, password:string){
    return this.login(email, password)
    .pipe(
      switchMap(() => this.getProfile())
    )
  }

  logout(){
    this.tokenService.removeToken();
  }

  // fetchLoginAndProfile(): Observable<User> {
  //   return this.login({
  //     email: 'nico@mail.com',
  //     password: '123456',
  //   }).pipe(switchMap((token) => this.profile(token)));
  // }
}
