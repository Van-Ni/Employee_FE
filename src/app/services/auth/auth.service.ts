import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REMOTE_API } from 'src/app/model/common';
import { Router } from '@angular/router';
export interface User {
  id: number;
  username: string;
  role_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth: boolean = false;

  constructor(private http: HttpClient,private router: Router) { }
  user = JSON.parse(localStorage.getItem('user') || '{}');

  // Phương thức để kiểm tra xem người dùng đã đăng nhập chưa
  public isAuthenticated(): boolean {
    return this.isAuth || this.user?.id;
  }

  public login(username: string, password: string): void {
    const loginUser = { username: username, password: password };
    this.http.post(`${REMOTE_API}/User/Login`, loginUser).subscribe(
      (response:User) => {
        const user : User = response;
        this.isAuth = true;
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.log(error);
      }
    );
  }

  public logout(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.id) {
      this.http.delete(`${REMOTE_API}/User/Logout/${user.id}`).subscribe(
        response => {
          this.isAuth = false;
          localStorage.removeItem('user');
        this.router.navigate(['/login']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
