import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../_service/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let toastr = inject(ToastrService)
  let service = inject(UserService)

  let menuname = '';

  if (route.url.length > 0) {
    menuname = route.url[0].path;
  }

  if (sessionStorage.getItem('username') != null) {
    return true;
  } else {
    toastr.warning('Unauthorized access');
    router.navigateByUrl('/login');
    return false;
  }

 

};
