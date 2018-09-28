import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument,  AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  usersCollection: AngularFirestoreCollection<any>;

  constructor(private firebaseAuth: AngularFireAuth, private afAuth: AngularFireAuth,
    private afs: AngularFirestore, ) {
      this.user = firebaseAuth.authState;
      this.usersCollection = afs.collection<any>('info');
  }

  signUp(email: string, password: string) {
    return this.firebaseAuth
    .auth
    .createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.firebaseAuth
    .auth
    .signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.firebaseAuth.auth
    .signOut();
  }

  loginGoogle() {
    return  new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.firebaseAuth.auth
      .signInWithPopup(provider)
      .then(response => {
        this.uploadUserToFirestore();
        resolve (response);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  loginFacebook() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.firebaseAuth.auth
      .signInWithPopup(provider)
      .then(response => {
        resolve(response);
        this.uploadUserToFirestore();
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  uploadUserToFirestore() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log(user);
        const data: User = {
          uid: user.uid,
          email: user.email || null,
          displayName: user.displayName || user.email,
          photoURL: user.photoURL || 'https://via.placeholder.com/350x150'
      };
      return this.afs.collection(`users`).doc(`${user.uid}`).set(data);
    }
    });
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
    };
    return userRef.set(data);
  }
}
