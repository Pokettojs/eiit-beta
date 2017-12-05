import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { AuthService } from '../../services/auth.service';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public auth: AuthService, public navCtrl: NavController) {
  }
  login(){
    this.auth.login();
    this.navCtrl.push(TabsPage);
  }
}

@Component({
  selector: 'log-out',
  template: `
        <ion-item (click)="logout()">
        <ion-label>Salir</ion-label>
        </ion-item>
  `
})
export class LogoutPage {

  constructor(public auth: AuthService, public navCtrl: NavController) {

  }
  logout(){
    this.auth.signOut();
    this.navCtrl.push(LoginPage);
  }
}
