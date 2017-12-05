import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'list-tab',
  templateUrl: 'list.html'
})
export class ListPage {
  usersCol: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  constructor(public navCtrl: NavController,private afs: AngularFirestore) {

  }

  ngOnInit(){
    this.usersCol = this.afs.collection('users', ref =>{
      return ref 
        .where('topic', '==', true)
        .orderBy('votesCount')
    });
    this.users = this.usersCol.valueChanges();
  }

}
