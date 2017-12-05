import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { LogoutPage } from '../login/login';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'profile-tab',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  window: string = 'profile';
  times: string;
  prices: string;
  isAdding = false;
  isUpdatingTimes = false;
  isUpdatingPrices = false;

  constructor(private popoverCtrl: PopoverController, public auth: AuthService, private afs: AngularFirestore, public loading: LoadingController) {
    
  }

  presentPopover(ev) {
    let popover = this.popoverCtrl.create(LogoutPage);
    popover.present({
      ev: ev
    });
  }

  setIsAdding(){
    this.isAdding = true;
  }

  setTopic(value: string, uid: string){
    var data = {
      topic: value,
      votesCount: 0
    }
    this.afs.doc(`users/${uid}`)
    .update({...data})
    .then(() => {
      // update successful (document exists)
      let loader = this.loading.create({
        content: "Favor de esperar...",
        duration: 1000
      });
      loader.present();
      this.isAdding = false;
    })
    .catch((error) => {
      // console.log('Error updating user', error); // (document does not exists)
      this.afs.doc(`users/${uid}`)
        .set({...data}).then(() =>{
          let loader = this.loading.create({
            content: "Favor de esperar...",
            duration: 1000
          });
          loader.present();
          this.isAdding = false;
        })
    });
  }

  setExtras(uid: string, times ?: string, prices ?: string){
    var data = {
      times: times,
      prices: prices
    }
    this.afs.doc(`users/${uid}`)
    .update({...data})
    .then(() => {
      // update successful (document exists)
      this.isAdding = false;
    })
    .catch((error) => {
      // console.log('Error updating user', error); // (document does not exists)
      this.afs.doc(`users/${uid}`)
        .set({...data}).then(() =>{
          this.isAdding = false;
        })
    });
  }

  setUpdateTimes(times: string){
    this.times = times;
    this.isUpdatingTimes = true;
  }
  unsetUpdateTimes(){
    this.isUpdatingTimes = false;
  }

  updateTimes(uid: string, times ?: string){
    if(times == null || times == undefined || times == ''){
      alert('Favor de agregar un horario');
    }else{
      var data = {
        times: times
      }
      this.afs.doc(`users/${uid}`)
      .update({...data})
      .then(() => {
        // update successful (document exists)
        this.isUpdatingTimes = false;
      })
      .catch((error) => {
        // console.log('Error updating user', error); // (document does not exists)
        this.afs.doc(`users/${uid}`)
          .set({...data}).then(() =>{
            this.isUpdatingTimes = false;
          })
      });
    }
  }

  setUpdatePrices(prices: string){
    this.prices = prices;
    this.isUpdatingPrices = true;
  }
  unsetUpdatePrices(){
    this.isUpdatingTimes = false;
  }

  updatePrices(uid: string, prices ?: string){
    if(prices == null || prices == undefined || prices == ''){
      alert('Favor de agregar un precio');
    }else{
      var data = {
        prices: prices
      }
      this.afs.doc(`users/${uid}`)
      .update({...data})
      .then(() => {
        // update successful (document exists)
        this.isUpdatingPrices = false;
      })
      .catch((error) => {
        // console.log('Error updating user', error); // (document does not exists)
        this.afs.doc(`users/${uid}`)
          .set({...data}).then(() =>{
            this.isUpdatingPrices = false;
          })
      });
    }
  }

}
