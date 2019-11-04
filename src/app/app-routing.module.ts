import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './components/pages/pages.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectLoggedInToHome = () => redirectLoggedInTo(['/']);

const routes: Routes = [
  { path: '',    component: PagesComponent },
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome }},
  { path: '**',  component: PagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
