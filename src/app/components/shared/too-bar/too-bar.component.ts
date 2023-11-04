import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './too-bar.component.html',
  styleUrls: ['./too-bar.component.scss'],
})
export class TooBarComponent {
  isLoggedIn: boolean = false;
  user: User;

  constructor(public authService: AuthService) {
    authService.isLoggedIn$.subscribe((data) => {
      this.isLoggedIn = data;
      this.user = JSON.parse(localStorage.getItem('user'));
    });
  }
}
