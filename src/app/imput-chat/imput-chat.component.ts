import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { DataService } from '../data.service';

@Component({
  selector: 'app-imput-chat',
  templateUrl: './imput-chat.component.html',
  styleUrls: ['./imput-chat.component.css']
})
export class ImputChatComponent implements OnInit {
  chat: any = {
    msn: '',
    username: '',
    date: ''
  };

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private dataBase: AngularFireDatabase, private dataService: DataService, public afAuth: AngularFireAuth ) { }

  ngOnInit() {
  }

  send() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
    const time = new Date().getTime();
    const date = new Date(time).toLocaleString([], {hour: '2-digit', minute: '2-digit'});
    const savedChat = this.chat;
    this.dataService.addChat(savedChat);
    this.chat.msn = '';
    this.chat.username = user.displayName;
    this.chat.date = date;
      }
    });
  }
}
