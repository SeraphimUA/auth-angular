import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Status {
  rcCode: number
}

@Injectable({
  providedIn: 'root'
})
export class EnsureLoginService {
  apiUrl = "https://localhost:5001/api/AuthTest";

  constructor(private readonly client: HttpClient) { }

  ensure(): Observable<{}> {
    return this.client.get(this.apiUrl, {
      responseType: 'text'
    });
  }
}
