import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage = '';

  constructor(public authService: AuthService, private router: Router,
    private fb: FormBuilder
  ) { this.createForm(); }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryFacebookLogin() {
    this.authService.doFacebookLogin()
      .then(res => {
        this.router.navigate(['home/one']);
      });
  }

  tryTwitterLogin() {
    this.authService.doTwitterLogin()
      .then(res => {
        this.router.navigate(['home/one']);
      });
  }

  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['home/one']);
      });
  }

  trySignUp(value) {
    this.authService.doRegister(value)
      .then(res => {
        this.router.navigate(['home/one']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });
  }

}
