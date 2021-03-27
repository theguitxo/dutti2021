import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  dataLoading: boolean = false;
  invalid: boolean = false;
  errorLoginUser: boolean = false;
  errorMessageLoginUser: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [ '', [Validators.required, Validators.minLength(3)]],
      password: [ '', [Validators.required, Validators.minLength(6)]]
    })
  }

  loginUser() {
    if (this.loginForm.invalid) { return }

    this.errorLoginUser = false;
    this.errorMessageLoginUser = '';

    this.dataLoading = true;

    const loginUser: boolean = this.authenticationService.logIn(this.loginForm.value.username, this.loginForm.value.password);

    this.dataLoading = false;

    if (loginUser) {
      this.router.navigate(['/principal/ships'])
    } else {
      this.errorLoginUser = true;
      this.errorMessageLoginUser = this.authenticationService.errorMessage || 'Error on loing user';
    }
  }
}

