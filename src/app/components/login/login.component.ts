import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('logInForm') logInForm: NgForm;

  logInEntry: any;

  constructor(
    public authService: AuthService,
  ){}

  logIn() {
    this.logInEntry = this.logInForm.value;
    console.log(this.logInEntry)

    this.logInForm.reset();
  }

}
