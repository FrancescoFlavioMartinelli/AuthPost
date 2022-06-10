import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'

export interface AuthData {
  accessToken: string;
  user: {
    email: string;
    id: number;
    name: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();

  url = "http://localhost:4201"

  private authSubj = new BehaviorSubject<null|any>(null)

  authObs = this.authSubj.asObservable()

  timeoutLogout:any

  constructor(private http:HttpClient) {
    this.restore()
  }

  restore() {
    const user = localStorage.getItem('user');
    if(!user)
      return

    const userData: AuthData = JSON.parse(user)
    if(this.jwtHelper.isTokenExpired(userData.accessToken))
      return

    this.authSubj.next(userData)

    this.autoLogout(userData)
  } 

  login(data:{email:string, password:string}) {
    return this.http.post<AuthData>(this.url+"/login", data).pipe(
      tap((res)=>{
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res))
        this.authSubj.next(res);
        this.autoLogout(res);
      })
    )
  }

  signUp(data:{email:string, password:string, firstname: string}) {
    return this.http.post(this.url+"/register", data)
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem("user");
    //
  }

  autoLogout(data:AuthData) {
    const expiration = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date
    const expMs = expiration.getTime() - new Date().getTime()
    this.timeoutLogout = setTimeout(()=>{
      this.logout();
    }, expMs)
  }

}
