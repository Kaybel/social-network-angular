import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { DataService } from '../data.service';

@Component({
  selector: 'app-imput-post',
  templateUrl: './imput-post.component.html',
  styleUrls: ['./imput-post.component.css']
})
export class ImputPostComponent implements OnInit {
  post: any = {
    message: '',
    username: '',
    photo: '',
    date: ''
  };

  // tslint:disable-next-line:max-line-length
  constructor( private formBuilder: FormBuilder, private authService: AuthService, private dataBase: AngularFireDatabase, private dataService: DataService, public afAuth: AngularFireAuth) { }

  ngOnInit() {}

agregar() {
  this.afAuth.authState.subscribe(user => {
    if (user) {
      const time = new Date().getTime();
      const date = new Date(time).toLocaleString([], {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'});
      const savedPost = this.post;
      this.dataService.addPost(savedPost);
      this.post.message = '';
      this.post.username = user.displayName;
      this.post.photo = user.photoURL;
      this.post.date = date;
    }
  });
}
}
