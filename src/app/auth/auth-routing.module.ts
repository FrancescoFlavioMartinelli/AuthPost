import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page.component';
import { RegistrationPageComponent } from './registration-page.component';
import { RouterModule, Routes } from '@angular/router';


const r: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'registration', component: RegistrationPageComponent }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(r)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
