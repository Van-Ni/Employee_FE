import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string;
  password: string;
  constructor(private authService: AuthService,private router: Router) {
  }

  ngOnInit() {
  
  }
  ngOnDestroy() {
  }
  onSubmit() {
    this.authService.login(this.username, this.password);
  }
}
