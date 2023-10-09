import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('innerHeader')innerHeader: boolean = true;

  popupType: string = 'login';
  constructor(private commonService: CommonService) {
    this.commonService.needLogin.subscribe((response:any)=>{
      this.showLogin = true;
    })
  }

  ngOnInit(): void {
  }

  showLogin:any = null;
  toggleLogin() {
      this.showLogin = (!this.showLogin);
  }

  togglePopup(type: string) {
      this.popupType = type;
  }
}
