import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../../../validators/validators';
// JSON
import usersList from 'src/assets/json/users.json';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  dataLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  get f() { console.log(this.registerForm.controls.repassword); return this.registerForm.controls; }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      first_name: [ '', [Validators.required, Validators.minLength(3)]],
      last_name: [ '', [Validators.required, Validators.minLength(3)]],
      username: [ '', [Validators.required, Validators.minLength(3)]],
      email: [ '', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      repassword: ['', [Validators.required]],
    },{
      validators: MustMatch('password', 'repassword')
    });
  }

  registerUser() {
    if (this.registerForm.invalid) { return }
    // TODO : Falta integrar el servicio para registrar al usuario
    // JSON simulando usuarios
    var userLogin = this.registerForm.value;
    usersList.push(userLogin)
    console.log('User Register -->', usersList)
    this.router.navigate(['/principal/ships'])

  }


}
