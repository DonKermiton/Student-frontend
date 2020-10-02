import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout-logged',
  templateUrl: './layout-logged.component.html',
  styleUrls: ['./layout-logged.component.scss']
})
export class LayoutLoggedComponent implements OnInit {
  sideMenu = false;

  constructor() {
  }

  ngOnInit() {
  }

  changeStateMenu() {
    console.log('zmiana');
    this.sideMenu = !this.sideMenu;
  }

}
