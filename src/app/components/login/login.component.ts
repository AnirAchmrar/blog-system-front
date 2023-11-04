import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup<string | any>({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      this.authService
        .login(
          this.loginForm.get('username')?.value,
          this.loginForm.get('password')?.value
        )
        .subscribe({
          next: () => {
            this.snackBar.open('Success!', '', {
              duration: 3000,
            });
            this.loginForm.reset();
            this.router.navigate(['home']);
          },
          error: (error) => {
            if (error) {
              if (error.status == 401) {
                if (error.error && error.error.message) {
                  this.loginForm.get('username').setErrors({ incorrect: true });
                  this.loginForm.get('password').setErrors({ incorrect: true });
                  this.snackBar.open('Wrong Credentials!', '', {
                    duration: 3000,
                  });
                }
              }
            }
          },
        });
    }
  }
}
