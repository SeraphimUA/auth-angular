import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService, Permission } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequirePermissionGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const requiredPermissions = route.data.requiredPermissions as Permission[];
    const tokenData = this.authService.tokenData$.value;

    if (!tokenData) return false;

    if(!requiredPermissions || requiredPermissions.length === 0) {
      throw new Error('please pass non-empty "requiredPermissions" param to route or use require-auth.guard instead');
    }

    return requiredPermissions.every(p => tokenData.permissions.includes(p));
  }
  
}
