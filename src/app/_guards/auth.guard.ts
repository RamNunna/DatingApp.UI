import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private toastService: ToastrService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this.accountService.currentUser$.pipe(
        map(user => {
          if(user) return true;
          else { this.toastService.error('you shall not pass!!'); return false };
        })
      )
  }
}
