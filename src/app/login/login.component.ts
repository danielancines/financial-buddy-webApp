import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login: string = 'daniel.ancines@gmail.com';
  password: string = '';

  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) {

  }

  executeLogin(): void {
    this._httpClient.post<any>("http://api.danielancines.com/api/v1/auth", { login: this.login, password: this.password })
      .pipe(
        catchError(error => {
          return error;
        })
      )
      .subscribe(
        response => {
          localStorage.setItem('token', response.token)
          this._router.navigate(['home']);
        }
      );
  }
}

export interface UserCredential {
  Name: string,
  Token: string
}
