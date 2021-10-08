import { map, tap } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface myToken {
  token: string
}

export interface TokenData {
  userId: number,
  username: string,
  notBefore: Date,
  expires: Date,
}

export interface LoginModel {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://localhost:5001/api/AuthToken";

  token$ = new BehaviorSubject<string | null>(null);
  tokenData$ = new BehaviorSubject<TokenData | null>(null);

  constructor(private readonly client: HttpClient) { }

  login(loginModel: LoginModel) {
    return this.client
      .post<myToken>(this.apiUrl, loginModel)
      .pipe(
        tap(t => this.token$.next(t.token)),
        map(t => {
          const tokenData = this.readToken(t);
          this.tokenData$.next(tokenData);
          return tokenData
        })
      );
  }

  private readToken(token: myToken): TokenData {
    const dataPart = token.token?.split('.')[1];
    const dataJsonString = atob(dataPart);
    const dataJson = JSON.parse(dataJsonString);

    const idStr = dataJson["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    const userId = idStr;
    const username = dataJson["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    const notBefore = dataJson["nbf"];
    const expires = dataJson["exp"];

    return {
      userId,
      username,
      notBefore,
      expires
    }
  }
}
