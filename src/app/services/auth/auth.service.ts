import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth: boolean = false;

  constructor() { }

  // Phương thức để kiểm tra xem người dùng đã đăng nhập chưa
  public isAuthenticated(): boolean {
    return true;
  }

  // Phương thức để đăng nhập người dùng
  public login(): void {
    // Thực hiện logic để đăng nhập
    this.isAuth = true;
  }

  // Phương thức để đăng xuất người dùng
  public logout(): void {
    // Thực hiện logic để đăng xuất
    this.isAuth = false;
  }
}
