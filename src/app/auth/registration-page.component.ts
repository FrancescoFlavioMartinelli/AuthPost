import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  template: `
  <form #f="ngForm" (ngSubmit)="registra(f)">
    <input type="text" name="nome" required ngModel>
    <input type="text" name="email" required ngModel>
    <input type="password" name="password" required ngModel>

    <button type="submit" [disabled]="f.invalid || isWaiting">
      Registrati
    </button>
  </form>
  `,
  styles: [
  ]
})
export class RegistrationPageComponent implements OnInit {

  isWaiting = false

  constructor(private authSrv:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  async register(f:NgForm) {
    this.isWaiting = true;
    console.log(f.value);
    try {
      await this.authSrv.signUp(f.value).toPromise;
      this.router.navigate(['/login']);
      this.isWaiting = false;
    } catch(err) {
      console.log(err);
      this.isWaiting = false;
      
    }
    
    
  }

}
