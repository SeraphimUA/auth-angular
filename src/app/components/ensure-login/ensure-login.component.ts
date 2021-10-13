import { Component } from '@angular/core';
import { EnsureLoginService } from 'src/app/services/ensure-login.service';

@Component({
  selector: 'app-ensure-login',
  templateUrl: './ensure-login.component.html',
  styleUrls: ['./ensure-login.component.scss']
})
export class EnsureLoginComponent {
  isSuccess = false;

  constructor(private readonly service: EnsureLoginService ) { }

  ensure() {
    this.service.ensure()
      .subscribe(
        (response: any) => {
          this.isSuccess = true
        },
        (error: any) => {
          this.isSuccess = false
        }
      );
  }
}
