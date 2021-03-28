
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ShipsComponent } from 'src/app/modules/principal/ships/ships.component';
import { STORAGE_KEYS } from 'src/app/enums/users.enum';
import { StorageService } from 'src/app/services/storage.service';
import { UsersService } from 'src/app/services/users.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports:[
        FormsModule,
        RouterTestingModule.withRoutes([{
          path: 'principal/ships',
          component: ShipsComponent,
        }]),
        ReactiveFormsModule],
      providers: [
        UsersService,
        StorageService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('create a new user', () => {
    localStorage.clear();

    component.registerForm.controls['first_name'].setValue('Usuario');
    component.registerForm.controls['last_name'].setValue('Usuario');
    component.registerForm.controls['username'].setValue('usuario');
    component.registerForm.controls['email'].setValue('usuario@servidor.com');
    component.registerForm.controls['password'].setValue('11111111');
    component.registerForm.controls['repassword'].setValue('11111111');

    component.registerUser();

    expect(component.errorNewUser).toBeFalsy();
  });

  it('password min length', () => {
    let password = component.registerForm.controls['password'];
    password.setValue('1111');

    expect(password.errors['minlength']).toBeTruthy();
  });

  it('password and repeat password must be equals', () => {
    let password = component.registerForm.controls['password'];
    let repassword = component.registerForm.controls['repassword'];

    password.setValue('11111111');
    repassword.setValue('11111111');

    expect(repassword.errors).toBe(null);
  });
});
