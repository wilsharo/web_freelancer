import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  errorMessage = '';

  constructor(public authService: AuthService, private router: Router,
    private fb: FormBuilder) {
      this.createForm();
     }

  ngOnInit() {
  }

  createForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  tryResetPassword(value) {
    this.authService.doResetPassword(value)
      .then(res => {
        this.router.navigate(['']);
      });
  }

}
