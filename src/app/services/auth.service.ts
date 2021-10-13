import { map, tap } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface myToken {
  token: string
}

export enum Permission {
  AccessAdmin,
  AccessUser,
}

export interface TokenData {
  userId: number,
  username: string,
  notBefore: Date,
  expires: Date,
  permissions: Permission[],
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

  login(loginModel: LoginModel): Observable<TokenData> {
    return this.client
      .post<myToken>(this.apiUrl, loginModel)
      .pipe(
        tap(t => this.token$.next(t.token)),
        map(t => {
          const tokenData = this.readToken(t);
          this.tokenData$.next(tokenData);
          return tokenData
        }),
        tap(t => console.log(t.permissions.includes(Permission.AccessUser)))
      );
  }

  logout() {
    this.token$.next(null);
    this.tokenData$.next(null);
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

    const permissionsData = dataJson["permissions"];
    const permissions = typeof permissionsData === 'string'
      ? [Permission[permissionsData]]
      : permissionsData
        .map(p => Permission[p]);

    return {
      userId,
      username,
      notBefore,
      expires,
      permissions
    }
  }
}
