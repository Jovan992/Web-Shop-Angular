import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signUpEntry: any;

@ViewChild('signUpForm') signUpForm: NgForm;

signUp(){
  this.signUpEntry = this.signUpForm.value;
  console.log(this.signUpEntry)
  
  this.signUpForm.reset();
  }

}
