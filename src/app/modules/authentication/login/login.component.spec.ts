import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ShipsComponent } from 'src/app/modules/principal/ships/ships.component';


import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        FormsModule,
        RouterTestingModule.withRoutes([{
          path: 'principal/ships',
          component: ShipsComponent,
        }]),
        ReactiveFormsModule],


    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check required for username', () => {
    let username = component.loginForm.controls['username'];
    username.setValue('');
    expect(username.hasError('required')).toBeTruthy();
  });

  it('check min length for username (no valid)', () => {
    let username = component.loginForm.controls['username'];
    username.setValue('aa');
    expect(username.hasError('minlength')).toBeTruthy();
  });

  it('check username is valid', () => {
    let username = component.loginForm.controls['username'];
    username.setValue('usuario');
    expect(username.valid).toBe(true);
  });

  it('check error user not exists', () => {
    let username = component.loginForm.controls['username'];
    let password = component.loginForm.controls['password'];

    username.setValue('usuario');
    password.setValue('11111111');

    component.loginUser();

    expect(component.errorLoginUser).toBe(true);
    expect(component.errorMessageLoginUser).toBe(`User usuario don't exists`);
  });

  it('check password error', () => {
    let users = [
      {
        email: "usuario@servidor.com",
        first_name: "Usuario",
        last_name: "Usuario",
        password: "11111111",
        username: "usuario",
      }
    ];

    localStorage.setItem('USERS', JSON.stringify(users));

    let username = component.loginForm.controls['username'];
    let password = component.loginForm.controls['password'];

    username.setValue('usuario');
    password.setValue('11111111');

    component.loginUser();

    expect(component.errorLoginUser).toBe(false);
  });
});
