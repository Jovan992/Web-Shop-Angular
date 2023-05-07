import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from '../models/Message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild('sendMessageForm') msgForm: NgForm;
  @ViewChild('subscribeForm') subForm: NgForm;

  subscribed: string;
  message: Message;

  onSendMessage() {
    this.message = new Message(this.msgForm.value.name, this.msgForm.value.email, this.msgForm.value.subject, this.msgForm.value.message)

    console.log(this.message)

    this.msgForm.reset();
  }
  onSubscribe() {
    this.subscribed = this.subForm.value.emailSub;
    console.log(this.subscribed)

    this.subForm.reset();
  }

 



}
