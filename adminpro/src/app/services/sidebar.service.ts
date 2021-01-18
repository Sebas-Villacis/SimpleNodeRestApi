import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: "Dashboard",
      icon: 'nav-small-cap',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'ProgressBar', url: 'progress' },
        { title: 'Graphics', url: 'graphic1' },
        { title: 'Promises', url: 'promises' },
        {title: 'rxjs', url:'rxjs'}
      ]
    }
  ];
  constructor() { }
}
