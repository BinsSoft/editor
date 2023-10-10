import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomvalidationService} from "../../services/customvalidation.service";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('innerHeader')innerHeader: boolean = true;

  isLoggedInUser: any = null;
  popupType: string = 'login';
  isValidSignup = true;
  emailExistsError: string = '';
  successMessage="";
  constructor(
    private fb:FormBuilder,
    private commonService: CommonService,
    private customvalidationService: CustomvalidationService,
    private apiService: ApiService) {
    this.commonService.needLogin.subscribe((response:any)=>{
      this.showLogin = true;
      this.popupType = 'login';
    });
    this.isLoggedInUser = (this.commonService.getAuthUser());
    this.signupForm = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, this.customvalidationService.patternValidator()]],
      confirmpassword: ['',[Validators.required]],
    },
      {
        validator: this.customvalidationService.MatchPassword('password', 'confirmpassword'),
      });

    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  showLogin:any = null;
  toggleLogin() {
      this.showLogin = (!this.showLogin);
      if (this.showLogin) {  this.popupType = 'login'; }
  }

  togglePopup(type: string) {
      this.popupType = type;
  }
  navigateEditor() {
    this.commonService.navigateEditor();
  }

  loginForm:FormGroup
  loginErrorMessage = '';
  loginAction() {
    this.apiService.login({
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }).subscribe((response:any)=>{
      if (response.statusText == 'error') {
        this.loginErrorMessage = "Login failed: please check email and password";
      } else {
        this.commonService.generateAuthUser(response.data);
        this.isLoggedInUser = this.commonService.getAuthUser();
        this.toggleLogin();
      }
    })

  }

  signupForm: FormGroup;
  signupAction() {
    this.emailExistsError = '';
    this.successMessage = '';
    this.isValidSignup = this.signupForm.valid;
    // console.log(this.signupForm);
    if (this.isValidSignup) {
      this.apiService.signup({
        "email": this.signupForm.value.email,
        "password": this.signupForm.value.password,
        "name": this.signupForm.value.name
      }).subscribe((response:any)=>{
        if (response.statusText == 'error') {
          this.emailExistsError = response.message;
        } else {
          this.successMessage = "Welcome "+this.signupForm.value.name+", please login now! ";
          this.popupType = 'login';
        }
      })
    }
  }
}
