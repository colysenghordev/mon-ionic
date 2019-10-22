import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  // tslint:disable-next-line: variable-name
  private _loginUrl = 'http://localhost:8000/api/login_check';

  roles: string;
  jwt: string;
  username: string;
  indexOf: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(user) {
    var headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    return this.http.post<any>(this._loginUrl, user, { headers: headers });
  }

  saveToken(jwt: string) {
    localStorage.setItem('token', jwt);
    this.jwt = jwt;
    this.parseJWT();
  }

  parseJWT() {
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt);
    this.username = objJWT.obj;
    this.roles = objJWT.roles;
  }

  isAdmin() {
    this.roles=localStorage.getItem("roles");
    return this.roles.indexOf('ROLE_Super-Admin') >= 0;
  }

  isPartenaire() {
    this.roles=localStorage.getItem("roles");
    return this.roles.indexOf('ROLE_Partenaire') >= 0;
  }

  logOut() {
    localStorage.removeItem('token');
    this.initParams();
    return this.router.navigate(["/home"]);
  }

  initParams() {
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }

}