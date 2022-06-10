import { Component, OnInit } from '@angular/core';
import { AuthData, AuthService } from './auth/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="#">Benvenuto {{user.name}}</a>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                [routerLink]="['/']"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                [routerLink]="['/active-posts']"
                routerLinkActive="active"
                >Posts attivi</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                [routerLink]="['/inactive-posts']"
                routerLinkActive="active"
                >Posts non attivi</a
              >
            </li>
            <li class="nav-item" *ngIf="user">
              <a
                class="nav-link"
                [routerLink]="['/users']"
                routerLinkActive="active"
                >Users</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                [routerLink]="['/login']"
                routerLinkActive="active"
                >Login</a
              >
            </li>
          </ul>

          <h6 *ngIf="user">Benvenut* {{user.name}}</h6>
          <button *ngIf="user" (click)="logout()">Logout</button>
        </div>
      </div>
    </nav>
  `,
  styles: [],
})
export class NavbarComponent implements OnInit {
  constructor(private authSrv: AuthService) {}

  user!:AuthData | null;

  ngOnInit(): void {
    this.authSrv.authObs.subscribe((res)=>{
      this.user = res
    })
  }

  logout() {
    if(confirm("Confermare il logout?") === true){
      this.authSrv.logout();
    }
  }
}
