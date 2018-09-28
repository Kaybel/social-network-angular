import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireAction, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-diarie',
  templateUrl: './diarie.component.html',
  styleUrls: ['./diarie.component.css']
})
export class DiarieComponent implements OnInit {
  posts: any;

  // tslint:disable-next-line:max-line-length
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private database: AngularFireDatabase, private dataservice: DataService) {
    this.dataservice.getPosts().subscribe(item => {
      this.posts = item;
    });
  }

  ngOnInit() {
  }

  // tslint:disable-next-line:max-line-length
  // iba a usar la funcion directamente en el data service pero al acceder al this. en el dataservice se perdia el "ref", por lo que no podia llamar al .add o .update o cualquier metodo en la collection asi que se hicieron las funciones del post al component.ts y se llaman de manera directa

  // tslint:disable-next-line:max-line-length
  // para usar los objetos en firebase se usa la ref de cada objeto, los collection permiten acceder a cada ref usando el .ref y luego el .doc donde le pasas el id del documento (path), luego de obtener la ruta se puede modificar y se guarda directamente en firebase.

  // tslint:disable-next-line:max-line-length
  // por que no necesitas hacer el ref para agregar items al collection? Pues como bien dice, no se manipula un objeto sino el collection el cual ya tiene el subscribe en el componente asi que luego de actualizar los likes o eliminar el post de la misma

  // ref y doc es para cuando manipulamos documentos individuales.

  count(item) {
    // tslint:disable-next-line:max-line-length
    if (item.likes) { // todo post inicia con likes undefined/null/0 si entras aqui ya tenias uno por lo que podemos incrementar sin romper el codigo
      item.likes ++;
    } else { // si no tienes nada se asigna el 1
      item.likes = 1;
    }
    this.dataservice.getPostsCollection().ref.doc(item.id).update(item);
  }

  remove(item) {
    this.dataservice.getPostsCollection().ref.doc(item.id).delete();
  }

  edit(item) {
    this.dataservice.getPostsCollection().ref.doc(item.id).update(item);
  }
}
