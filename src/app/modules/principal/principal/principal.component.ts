import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  logOff(): void {
    this.authenticationService.logOff();
    this.router.navigate(['']);
  }
}
