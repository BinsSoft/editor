import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('innerHeader')innerHeader: boolean = true;

  isLogin: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  showLogin:any = null;
  toggleLogin() {
      this.showLogin = (!this.showLogin);
  }

}
