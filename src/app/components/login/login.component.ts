import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

@ViewChild('logInForm') logInForm: NgForm;

logInEntry: any;

logIn(){
  this.logInEntry = this.logInForm.value;
console.log(this.logInEntry)

this.logInForm.reset();
}

}
