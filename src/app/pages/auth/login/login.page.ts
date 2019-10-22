import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    form: FormsModule;
  
    jwt: string;
  
    loginUserData = {};
  
    helper = new JwtHelperService();
    accountData: any;
    authService: any;
    roles: String;
  
    // tslint:disable-next-line: variable-name
    constructor(private _auth: AuthService, private router: Router) {
  
      /*this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });*/
  
    }
  
    ngOnInit() {
    }
  
    onSubmit() {
      this._auth.login(this.loginUserData)
        .subscribe(
          res => {
            const token = res.token;
            localStorage.setItem('token', token);
            const decodedToken = this.helper.decodeToken(token);
            console.log(this.loginUserData);
            localStorage.setItem('username', decodedToken.username);
            localStorage.setItem('roles', decodedToken.roles[0]);
            localStorage.setItem('expiration', decodedToken.exp);
            console.log(localStorage);
            this.newMethod();
          },
          err => console.log(err),
        );
    }
  
    private newMethod() {
      this.roles=localStorage.getItem("roles");
      if (this.roles =="ROLE_Super-Admin" ) {
        this.router.navigate(["/dashboard"]);
      }
      else if (this.roles == "ROLE_Partenaire") {
        this.router.navigate(["/dashboard"])
      }
    }
  
  }
  