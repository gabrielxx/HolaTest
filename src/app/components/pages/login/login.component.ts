import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../providers/authentication.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
  public formLoginUser = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })
  constructor(public _AuthService: AuthenticationService, private router: Router) { }

  onLogin() {

    let data = this.formLoginUser.value;
    this._AuthService.onLoginUser(data,
      () => {
        this.router.navigate(['/admin']);
      },
      (error) => {
        Swal.fire('Error!', error.message, 'error')
      }
    )

  }
}