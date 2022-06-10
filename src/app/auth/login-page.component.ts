import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login-page',
  template:`<form #f="ngForm" (ngSubmit)="accedi(f)">
  <input type="email" name="email" ngModel required>
  <input type="password" name="password" ngModel required>

  <button  [disabled]="f.invalid || isWaiting" type="submit">Login</button>
</form>`,
  styles: [
  ]
})
export class LoginPageComponent implements OnInit {

  constructor(private authSrv:AuthService, private router:Router) { }

  isWaiting = false

  ngOnInit(): void {
  }
  
  async accedi(form:NgForm) {
    // this.authSrv.login(form.value).subscribe(
    //   (res)=> {
    //     this.router.navigate(['/users']);
    //   }
    // )
    this.isWaiting = true
    try{
      await this.authSrv.login(form.value).toPromise()
      console.log("Loggato");
      this.router.navigate(['/users']);
    } catch(err){
      console.log(err);
      this.isWaiting = false;
    }
  }

}
