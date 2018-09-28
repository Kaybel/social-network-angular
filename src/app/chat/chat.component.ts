import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireAction, AngularFireList } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from '../data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chat: any;
  userName: any;
  photo: any;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private database: AngularFireDatabase, private dataservice: DataService, public afAuth: AngularFireAuth ) {
    this.dataservice.getChat().subscribe(item => {
      this.chat = item;
    });

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userName = user.displayName;
        this.photo = user.photoURL;
      }
    });
  }

  ngOnInit() {
  }

  remove(item) {
    this.dataservice.getChatsCollection().ref.doc(item.id).delete();
  }
}
