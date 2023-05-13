import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  @ViewChild('signUpForm') signUpForm: NgForm;

  constructor(
    public authService: AuthService,
  ) { }

  signUp() {
    $("#signupModal").modal('show');
    
    this.signUpForm.reset();
  }

  sendMailAgain(){
    this.authService.SendVerificationMail()
  }
}
