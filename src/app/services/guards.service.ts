import { Injectable } from "@angular/core";
import { CanLoad, Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class CanLoadPrincipalGuard implements CanLoad {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  canLoad() {
    if (!this.authenticationService.isLogged) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
