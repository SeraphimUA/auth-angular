import { Component } from '@angular/core';
import { AuthService, LoginModel } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData: LoginModel = {
    username: '',
    password: ''
  };

  isLoggedIn = false;
  userId = 0;
  userName = '';
  notBefore = new Date();
  expires = new Date();

  constructor(private readonly authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.loginData)
      .subscribe((tokenData) => {
        this.isLoggedIn = true;
        this.userId = tokenData.userId;
        this.userName = tokenData.username;
        this.notBefore.setTime(new Date(tokenData.notBefore).getTime()*1000);
        this.expires.setTime(new Date(tokenData.expires).getTime()*1000);
      });
  }

  // private convertDate(d: Date) {
  //   console.log(`function convertDate: d = ${d}`);
  //   let milliseconds = d.getTime()*1000;
  //   console.log(`function convertDate: milliseconds = ${milliseconds}`);
  //   return new Date(milliseconds);
  // }

}
