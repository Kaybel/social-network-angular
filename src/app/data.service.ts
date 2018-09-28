import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth} from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';

export interface Post {
  message: string;
  likes: number;
  username: string;
  id: any;
  date: string;
  photo: any;
}

export interface Chat {
  msn: string;
  username: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private postCollection: AngularFirestoreCollection<Post>;
  posts$: Observable<Post[]>;
  private postDoc: AngularFirestoreDocument<Post>;

  private chatCollection: AngularFirestoreCollection<Chat>;
  chat$: Observable<Chat[]>;
  private chatDoc: AngularFirestoreDocument<Chat>;

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth, private database: AngularFireDatabase) {
    this.postCollection = afs.collection<Post>('post', ref => ref.orderBy('date', 'desc'));
    this.posts$ = this.postCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    this.chatCollection = afs.collection<Chat>('chat', ref => ref.orderBy('date'));
    this.chat$ = this.chatCollection.snapshotChanges().pipe(
      map(index => index.map(i => {
        const dataChat = i.payload.doc.data() as Chat;
        const id = i.payload.doc.id;
        return {id, ...dataChat};
      }))
    );
  }

  getPosts() {
    return this.posts$;
  }

  addPost(item: Post) {
    this.postCollection.add(item);
  }
  getChat() {
    return this.chat$;
  }

  addChat(item: Chat) {
    this.chatCollection.add(item);
  }

  // la propiedad se mantiene privada y la unica manera de acceder a ella es con este metodo
  // tal cual como se obtiene el chat y el posts
  // Por que necesito acceder desde fuera a esta collection? pues con este collection voy a usar
  // las referencias a los documenstos que me permites actualizar y eliminarlos
  getPostsCollection() {
    return this.postCollection;
  }
  getChatsCollection() {
    return this.chatCollection;
  }
}




