import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
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
    message: ''
  };

  // tslint:disable-next-line:max-line-length
  constructor( private formBuilder: FormBuilder, private authService: AuthService, private dataBase: AngularFireDatabase, private dataService: DataService) { }

  ngOnInit() {}

  agregar() {
    // let userName = this.
    let savedPost = this.post;
    savedPost.username = 'userName'; // aca va el usuario
    this.dataService.addPost(savedPost);
    this.post.message = '';
  }
}
