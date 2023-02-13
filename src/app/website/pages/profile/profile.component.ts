import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit  {

  user: User | null = null;
  constructor(
    private authService: AuthService
  ){}

  ngOnInit(): void {
    //cambio por video:21-estado de login
    // this.authService.getProfile()
    this.authService.user$
    .subscribe(data => {
      this.user = data;
    })
  }
}
