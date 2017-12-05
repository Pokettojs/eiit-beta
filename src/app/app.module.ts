import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Facebook } from '@ionic-native/facebook';
import { Toast } from '@ionic-native/toast';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthService } from '../services/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { ProfilePage } from '../pages/profile/profile';
import { Top3Page } from '../pages/top3/top3';
import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export const config = {
  apiKey: "AIzaSyCrfI4REI1H4zEWj--222nXGZgBQ-6AsCU",
  authDomain: "eiit-beta.firebaseapp.com",
  databaseURL: "https://eiit-beta.firebaseio.com",
  projectId: "eiit-beta",
  storageBucket: "",
  messagingSenderId: "1006879930472"
}

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    Top3Page,
    ListPage,
    TabsPage,
    LoginPage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    Top3Page,
    ListPage,
    TabsPage,
    LoginPage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    Toast,
    AuthService
  ]
})
export class AppModule {}
