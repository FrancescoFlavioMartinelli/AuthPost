import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users:User[] =[
    {
      email:'c@fff.com',
      id:1,
      name:"carlo",
      role:'user'
    },
    {
      email:'luc@fff.com',
      id:2,
      name:"luca",
      role:'admin'
    }
  ]

  constructor(private http:HttpClient, private authSrv:AuthService) { }

  getUsers(){
    return this.http.get<User[]>(this.authSrv.url+"/users")
  }

  getUser(id:number){
    return this.http.get<User[]>(this.authSrv.url+"/users/"+id)
  }
}
