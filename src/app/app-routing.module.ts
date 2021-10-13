import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnsureLoginComponent } from './components/ensure-login/ensure-login.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { RequireAuthGuard } from './guards/require-auth.guard';
import { RequirePermissionGuard } from './guards/require-permission.guard';
import { Permission } from './services/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'isUser', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'userlist',
    component: UsersListComponent,
    canActivate: [RequirePermissionGuard],
    data: { requiredPermissions: [Permission.AccessAdmin] },
  },
  {
    path: 'isUser',
    component: EnsureLoginComponent,
    canActivate: [RequirePermissionGuard],
    data: { requiredPermissions: [Permission.AccessUser] },
  },
  { path: 'logout', component: LogoutComponent, canActivate: [RequireAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
