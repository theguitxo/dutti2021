import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  dataLoading: boolean = false;
  errorNewUser: boolean = false;
  errorMessageNewUser: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService,
    private authenticationService: AuthenticationService,
  ) { }

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      first_name: [ '', [Validators.required, Validators.minLength(3)]],
      last_name: [ '', [Validators.required, Validators.minLength(3)]],
      username: [ '', [Validators.required, Validators.minLength(3)]],
      email: [ '', [Validators.required, Validators.minLength(6), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      repassword: ['', [Validators.required]],
    });
  }

  registerUser() {
    if (this.registerForm.invalid) { return }

    this.errorNewUser = false;
    this.errorMessageNewUser = '';

    this.dataLoading = true;

    const save = this.usersService.addUser({
      first_name: this.registerForm.value.first_name,
      last_name: this.registerForm.value.last_name,
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
    });

    this.dataLoading = false;

    if (save) {
      this.authenticationService.logIn(this.registerForm.value.username, this.registerForm.value.password);
      this.router.navigate(['/principal/ships']);
    } else {
      this.errorNewUser = true;
      this.errorMessageNewUser = this.usersService.errorMessage || 'An error has occurred on creating new user';
    }
  }
}
