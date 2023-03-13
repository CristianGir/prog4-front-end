import { Component, ViewChild } from "@angular/core";
import {
  NgForm,
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "app/shared/auth/auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from "app/shared/auth/login.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent {
  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new UntypedFormGroup({
    username: new UntypedFormControl("guest@apex.com", [Validators.required]),
    password: new UntypedFormControl("Password", [Validators.required]),
    rememberMe: new UntypedFormControl(true),
  });

  constructor(
    private router: Router,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {}

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined, {
      type: "ball-triangle-path",
      size: "medium",
      bdColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      fullScreen: true,
    });
    this.spinner.hide();
    this.router.navigate(["/page"]);
  }
  forgotpassword() {
    this.router.navigate(["/pages/forgot-password"]);
  }
}
