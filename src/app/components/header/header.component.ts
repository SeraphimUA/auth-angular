import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private readonly authService: AuthService) {
    
  }

  isLoggedIn(): boolean {
    const tokenData = this.authService.tokenData$.value;

    let isLoggedIn = !!tokenData;
    return isLoggedIn;
  }

}
