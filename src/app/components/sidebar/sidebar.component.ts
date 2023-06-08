import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: '(.)Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/user-profile', title: 'Thông tin cá nhân',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    {path: "/employee",title: 'Nhân viên',  icon:'ni-key-25 text-info', class: 'd-none'},
    { path: '/time-keeping', title: 'Chấm công',  icon:'ni-time-alarm text-info', class: '' },
    {path: "/departments",title: 'Chức vụ',  icon:'ni-key-25 text-info', class: 'd-none'},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  user:any = JSON.parse(localStorage.getItem('user') || '{}');
  constructor(private router: Router) {
    console.log(this.user.role_name);
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
