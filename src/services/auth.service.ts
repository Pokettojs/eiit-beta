import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Toast } from '@ionic-native/toast';
import 'rxjs/add/operator/switchMap';
import { LoadingController } from 'ionic-angular';

export interface User {
    uid: string,
    email: string,
    photoURL ?: string,
    displayName ?: string,
    votesCount ?: number,
    votes ?: object,
    topic ?: string,
    times ?: string, 
    prices ?: string
  }

@Injectable()
export class AuthService {
  user: Observable<User>;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private fb: Facebook,
              public toast: Toast,
              public loadingCtrl: LoadingController) {
      //// Get auth data, then get firestore user document || null
      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user) {
            return this.afs.collection('users').doc<User>(user.uid).valueChanges();
          } else {
            return Observable.of(null);
          }
        })
  }
  login() {
    let loader = this.loadingCtrl.create({
      content: "Favor de esperar...",
      duration: 1000
    });
    loader.present();
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
        let provider = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return this.oAuthLogin(provider);
    });
  }
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInAndRetrieveDataWithCredential(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      })
  }
  private updateUserData(user) {
    // Sets user data to firestore on login
    
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }
    this.afs.doc(`users/${user.uid}`)
    .update(data)
    .then(() => {
      // update successful (document exists)
      console.log("yei");
    })
    .catch((error) => {
      // console.log('Error updating user', error); // (document does not exists)
      this.afs.doc(`users/${user.uid}`)
        .set(data);
    });
  }
  signOut() {
    return this.fb.logout().then(() =>{
      this.afAuth.auth.signOut();
    });
  }
}
